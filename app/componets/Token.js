import Image from "next/image";
import close from '../assets/close.svg'
import up from '../assets/up.svg'
import down from '../assets/down.svg'

const Token = ({setIsTokenModalOpen, token}) => {
    const closeHandler = () => {
        setIsTokenModalOpen(false)
    }
    return (
        <div className="popup">
            <div className="popup__content token">
                <div className="token__title">
                    <Image 
                    src={token.market.image}
                    width={40}
                    height={40}
                    alt="Token Image"/>

                    <h3> {token.market.name}<small>{token.market.symbol.toUpperCase()}</small> </h3>
                </div>
                <hr />
                <div className="token__price">
                    <p>{token.market.current_price.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}
                        <small>
                            <Image 
                                src={token.market.price_change_percentage_24h < 0 ? down : up}
                                width={15}
                                height={15}
                                alt="Close Popup"
                            />
                            <span className={token.market.price_change_percentage_24h < 0 ? "red" : "green"}>{token.market.price_change_percentage_24h.toFixed(2)}%</span>
                        </small>
                    </p>
                    
                </div>
                <hr />
                <div className="token__details">
                    <div>
                        <h4>All Time High</h4>
                        <p>{token.market.ath.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</p>
                    </div>
                    <div>
                        <h4>Market Cap</h4>
                        <p>{token.market.market_cap.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</p>
                    </div>
                    <div>
                        <h4>Circulating Supply</h4>
                        <p>{token.market.circulating_supply.toLocaleString('en-US')}</p>
                    </div>
                    <div>
                        <h4>Total Supply</h4>
                        <p>{token.market.total_supply.toLocaleString('en-US')}</p>
                    </div>
                    <div>
                        <h4>Max Supply</h4>
                        <p>{token.market.max_supply ? token.market.max_supply.toLocaleString('en-US') : (<>&#8734;</>)}</p>
                    </div>
                    {token.adddress && (
                        <div>
                            <h4>Contract Address</h4>
                            <p>{token.address}</p>
                        </div>
                    )}
                </div>
                <button onClick={closeHandler}>
                    <Image 
                    src={close}
                    width={15}
                    height={15}
                    alt="Close Popup"/>
                </button>
            </div>
        </div>
    )
}

export default Token;