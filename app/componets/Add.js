import Image from 'next/image'
import close from '../assets/close.svg'

const Add = ({setIsAddTokenModalOpen, markets, trackedTokens, setTrackedTokens}) => {
    const closeHandler = () => {
        setIsAddTokenModalOpen(false)
    }
    const tokenHandler = (e) => {
        e.preventDefault()
        setTrackedTokens([...trackedTokens, e.target.tokens.value])
        setIsAddTokenModalOpen(false)
    }

    return (
        <div className='popup'>
            <div className='popup__content add'>
                <h3>Track a New Token</h3>
                <button onClick={closeHandler}>
                    <Image
                        src={close}
                        width={15}
                        height={15}
                        alt="Close popup"
                    />
                </button>
                <form onSubmit={tokenHandler}>
                    <label htmlFor="tokens">Select a Token</label>
                    <select name="tokens" id="tokens">
                        {markets && (
                            markets.map((market, index) => (
                                <option key={index} value={market.id}>{market.symbol.toUpperCase()}</option>
                            ))
                        )}
                    </select>
                    <input type='submit' />
                </form>
            </div>
        </div>
    )
}

export default Add;