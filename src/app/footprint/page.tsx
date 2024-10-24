"use client"

import { useEffect, useRef, useState } from "react";
import keyConfig from "@/data/key.json";
import citiesData from "@/data/cities.json"

export default function Page() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    // 保留地图实例
    const mapRef = useRef<AMap.Map | null>(null);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    // 保留DistrictLayer实例
    const districtLayerRef = useRef<AMap.DistrictLayer.Province | null>(null);

    const [colors, setColors] = useState<{ [key: string]: string }>({});

    let cityAdcodes = citiesData.CHN.provinces.flatMap(province => {
        return province.cities ? province.cities.map(city => city.adcode) : []
    })

    // 添加澳门的 adcode
    cityAdcodes = cityAdcodes.concat("820000");

    useEffect(() => {
        // 颜色辅助方法
        const getColorByAdcode = (adcode: string) => {
            if (!colors[adcode]) {
                const r = Math.floor(Math.random() * 256);
                const g = Math.floor(Math.random() * 256);
                const b = Math.floor(Math.random() * 256);
                setColors(prevColors => ({
                    ...prevColors,
                    [adcode]: `rgb(${r},${g},${b})`
                }));
            }
            return colors[adcode];
        };

        if (typeof window !== 'undefined') {
            // 动态导入 AMapLoader
            import('@amap/amap-jsapi-loader').then(({ default: AMapLoader }) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                window._AMapSecurityConfig = {
                    securityJsCode: keyConfig.AMap.secret,
                };

                AMapLoader.load({
                    key: keyConfig.AMap.key, // 申请好的Web端开发者Key
                    version: "2.0",
                    plugins: ["AMap.Scale", "AMap.DistrictLayer"],
                })
                    .then((AMap) => {
                        // 初始化地图
                        if(!mapRef.current) {
                            mapRef.current = new AMap.Map("footprint_map_container", {
                                viewMode: "2D",
                                zoom: 8.8,
                                center: [113.817117, 22.952641], // 初始地图中心点
                            });
                        }

                        // 初始化图层
                        if (!districtLayerRef.current) {
                            districtLayerRef.current = new AMap.DistrictLayer.Province({
                                zIndex: 12,
                                zooms: [2, 15],
                                adcode: ['440000', '820000'], // 行政区划代码：广东省、澳门
                                depth: 1, // 显示到市级
                            });
                        }

                        console.log(cityAdcodes)

                        // 设置图层样式
                        districtLayerRef.current.setStyles({
                            fill: function (props: any) {
                                const adcode = props.adcode.toString()
                                console.log(adcode)
                                if (cityAdcodes.includes(adcode)) {
                                    return getColorByAdcode(adcode);
                                }
                            },
                            'province-stroke': 'rgb(137,255,202)',
                            'city-stroke': 'rgb(135,75,151)', // 市边界样式
                            'county-stroke': 'rgb(113,89,204)' // 区边界样式
                        })

                        // 将图层添加到地图
                        mapRef.current.add(districtLayerRef.current);
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            }).catch((e) => {
                console.error(e);
            });
        }
    }, [cityAdcodes, colors]); // 仅在 `colors` 变化时更新图层，不重新创建地图

    return (
        <div className="border-4 border-primary rounded-2xl w-[150vh] max-w-full h-auto">
            <div
                id="footprint_map_container"
                className="rounded-xl w-full h-[80vh] max-h-[80vh]"
                style={{ padding: '0', margin: '0' }}
            >
            </div>
        </div>
    );
}
