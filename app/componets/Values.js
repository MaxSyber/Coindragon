import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const Values = ({ tokens }) => {
    const defaultDates = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']
    const defaultValues = [30, 40, 45, 50, 49, 60, 70, 91]

    const [dates, setDates] = useState(null)
    const [values, setValues] = useState(null)

    const calculate7DayValue = () => {
        const totalValues= [0, 0, 0, 0, 0, 0, 0, 0]

        for (let i = 0; i < tokens.length; i++) {
            for (let j = 0; j < tokens[i].prices.length; j++) {
                totalValues[j] += tokens[i].balance * tokens[i].prices[j][1]
                totalValues[j] = Number(totalValues[j].toFixed(2))
            }
        }
        

        
        let dates = Object.values(tokens[0].prices).flatMap(price => price[0])
        //let dates = tokens[0].prices.map(price => price[0])

        for (let i = 0; i < dates.length; i++) {
            dates[i] = new Date(dates[i]).toLocaleDateString(undefined, {
                weekday: 'short', month: 'short', day: 'numeric'
            })
        }

        setDates(dates)
        setValues(totalValues)
    }

    useEffect(() => {
        if (tokens.length === 0) {
            setDates(null)
            setValues(null)
        } else {
        calculate7DayValue()
        }
    }, [tokens])
    return (
        <div className="value">
            <h3 className="value__title"> Portfolio 7 Day Value</h3>
            <div className="value__chart">
            <Chart 
                options={{
                    colors: ["#2F4858"],
                    stroke: {
                        curve: "smooth",
                        colors: ['#488451']
                    },
                    grid: {
                        show: false
                    },
                    xaxis: {
                        categories: dates ? dates : defaultDates,
                        labels: {
                            show: true,
                            rotateAlways: true,
                            rotate: -45,
                            offsetY: 10,
                            style: {
                                colors: '#FFFFFF'
                            }
                        },
                    },
                    yaxis: {
                        labels: {
                            show: true,
                            offsetX: -10,
                            style: {
                                colors: '#FFFFFF'
                            }
                        },
                    },
                    tooltip: {
                        enabled: true,
                        theme: 'dark',
                        style: {
                            fontSize: '12px',
                            background: '#FFFFFF'
                        },
                    },
                    markers: {
                        size: 6,
                        colors: ['#2F4858'],
                        strokeColors: '#fff',
                        strokeWidth: 2,
                        hover: {
                            size: 8,
                        },
                    },
                    
                }}
                series={[
                    {
                    name: 'Price',
                    data: values ? values : defaultValues
                    }
                ]}
                type='line'
                height='300'
                width='100%'
            />
            </div>
        </div>
    )
}

export default Values;