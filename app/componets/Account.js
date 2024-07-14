import Image from 'next/image'
import close from '../assets/close.svg'
const Account = ({ setIsAccountModalOpen, setAccount }) => {
    const closeHandler = () => {
        setIsAccountModalOpen(false)
    }
    const accountHandler = (e) => {
        e.preventDefault()
        setAccount(e.target.account.value)
        setIsAccountModalOpen(false)
    }
    return (
        <div className="popup">
            <div className="popup__content account">
                <h3>Set Account</h3>
                
                <button onClick={closeHandler}>
                    <Image
                        src={close}
                        width={15}
                        height={15}
                        alt="Close popup"
                    />
                </button>
                <form onSubmit={accountHandler}>
                    <label htmlFor="account">Enter Ethereum Address</label>
                    <input 
                        type="text" 
                        name="account" 
                        id="account" 
                        placeholder="0X00000000000000000000000000000000"></input>
                    <input type="submit"></input>
                </form>
            </div>
        </div>
    )
}

export default Account;