import { useState } from 'react';
import Image from 'next/image';
import minus from '../assets/minus.svg';
import Token from './Token';

const Assets = ( {tokens, setTokens }) => {
    const [isTokenModalOpen, setIsTokenModalOpen] = useState(false)
    const [token, setToken] = useState(false)
    const tokenModalHandler = (token) => {
        setToken(token)
        setIsTokenModalOpen(true)
    }
    const removeHandler = (token) => {
        if (token.length === 1) {
            setTokens([])
        } else {
            const index = tokens.indexOf(tokens.find((t) => t.id === token.id))
            const tokensArray = tokens.slice()
            tokensArray.splice(index, 1)
            setTokens(tokensArray)
        }
    }
    
    return (
      <div className="assets">
        <h3>My Assets</h3>
        <table>
          <thead>
            <tr>
                <th>#</th>
                <th>Token</th>
                <th>Symbol</th>
                <th>Price</th>
                <th>Holdings</th>
                <th>Total Value <small>(USD)</small></th>
                <th></th>
                <th></th>
            </tr>
          </thead>
          <tbody>
            {tokens.map((token, index) => (
                <tr key={index}>
                <td>{index +1}</td>
                <td>{token.market.name}</td>
                <td>{token.market.symbol.toUpperCase()}</td>
                <td>{token.market.current_price.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</td>
                <td>{token.balance}</td>
                <td>{token.value.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</td>
                <td>
                    <button onClick={()=> tokenModalHandler(token)}>Details</button>
                </td>
                <td>
                    <button className="untrack" onClick={() => removeHandler(token)}>
                        <Image 
                            src={minus}
                            width={20}
                            height={20}
                            alt='Untrack Token'
                        />
                    </button>
                </td>
              </tr>
            ))}       
          </tbody>
        </table>

        {isTokenModalOpen && 
            <Token setIsTokenModalOpen={setIsTokenModalOpen} token={token}/>
        }
      </div>
    );
  }
  
  export default Assets;
  