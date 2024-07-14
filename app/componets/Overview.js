import { useEffect, useState } from 'react'
import Image from 'next/image'
import Account from './Account'
import Add from './Add'
import up from '../assets/up.svg'
import down from '../assets/down.svg'
import add from '../assets/add.svg'


const Overview = ({account, setAccount, markets, trackedTokens, setTrackedTokens, tokens}) => {
    const [value, setValue] = useState(0)
    const [percent, setPercent]= useState(0)
    const [isAccountModalOpen, setIsAccountModalOpen] = useState(false)
    const [isAddTokenModalOpen, setIsAddTokenModalOpen] = useState(false)
    const accountModalHandler = () => {
        setIsAccountModalOpen(true)
    }
    const tokenModalHandler = () => {
        if (account) {
            setIsAddTokenModalOpen(true) 
        } else {
            setIsAccountModalOpen(true)
        }
    }
    const calculateValue = () => {
        let total = 0
        for(var i=0; i < tokens.length; i++) {
            if(tokens[i].balance === 0) { continue }
            total += tokens[i].value
        }

        setValue(total)

    }

    const calculatePercent = () => {
        let total = 0

        for(var i=0; i < tokens.length; i++) {
            if(tokens[i].balance === 0) { continue }
            const pastValue = (tokens[i].market.current_price - tokens[i].market.price_change_24h) * tokens[i].balance
            const currentValue = tokens[i].value
            const change= ((currentValue - pastValue) /pastValue) * 100
            total += change
        }
        setPercent(total)
    }
    useEffect(() => {
        if (tokens.length ===0) {
            setValue(0)
            setPercent(0)
        }  else { 
            calculateValue()
            calculatePercent() 
        }
    })
    
    return (
        <div className="overview">
            <div className="overview__account">
                <h3>Account</h3>
                { account ? (
                    <p> {account.slice(0,6) + "..." + account.slice(-4)} </p>
                ) : (
                <button onClick={accountModalHandler}>
                    <Image 
                        src={add}
                        width={20}
                        height={20}
                        alt="Set account"
                    />
                </button>
                )}
               
            </div>
            <div className="overview__tracked">
                <h3>Assets Tracked</h3>
                <p>{tokens.length}</p>
                <button onClick={tokenModalHandler}>
                    <Image 
                        src={add}
                        width={20}
                        height={20}
                        alt="Add token"
                    />
                </button>
            </div>
            <div className="overview__total">
                <h3>Total Value</h3>
                <p>{value.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</p>
            </div>
            <div className="overview__change">
                <h3>% Change</h3>
                <p>
                    <Image 
                        src={percent < 0 ? down : up}
                        width={20}
                        height={20}
                        alt="Change direction"
                    />
                
                    <span className={percent < 0 ? "red" : "green"}>{percent.toFixed(2)}%</span>
                </p>
            </div>
            {isAccountModalOpen && 
                <Account 
                    setIsAccountModalOpen={setIsAccountModalOpen}
                    setAccount = {setAccount}
                />
            }
            {isAddTokenModalOpen && 
             <Add 
                setIsAddTokenModalOpen={setIsAddTokenModalOpen}
                markets={markets}
                trackedTokens={trackedTokens}
                setTrackedTokens={setTrackedTokens}
             />}
           
        </div>
    )
}

export default Overview;