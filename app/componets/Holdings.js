import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const Holdings = ({tokens}) => {
    const [symbols, setSymbols] = useState(null)
    const [balances, setBalances] = useState(null)
    const defaultSymbols = ["---","---","---","---","---"]
    const defaultBalance = [15, 40, 44, 150, 5]

    const calculateValue = () => {
        let syms = []
        let bals = []
        for (var i =0; i <tokens.length; i++) {
            syms.push(tokens[i].market.symbol.toUpperCase())
            bals.push(tokens[i].value)
        }
        setSymbols(syms)
        setBalances(bals)
    }

    useEffect(() => {
        if (tokens.length === 0) {
            setSymbols(null)
        } else {
            calculateValue()
        }
    }, [tokens])
    
    return (
        <div className="holdings">
            <h3 className="holdings__title"> Asset Holdings</h3>
            <div className="holdings__chart">
                <Chart 
                options={{
                    labels: symbols ? symbols : defaultSymbols,
                    legend: {
                        position: 'left',
                        horizontalAlign: 'center',
                        labels: {
                            fontSize: '48px',
                            fontWeight: 'bold',
                            colors: '#FFFFFF'
                        }
                    }
                }}
                series={balances ? balances : defaultBalance}
                type='pie'
                height='300'
                width='100%'
            />
            </div>
        </div>
    )
}

export default Holdings;