import React, { useState } from 'react';
import MetaData from '../layout/MetaData';
import './search.css'
const Search = ({history}) => {
    const [keyword, setkeyword] = useState("");
    const searchSubmitHandler = (e) =>{
        e.preventDefault();
        if(keyword.trim()){
            history.push(`/products/${keyword}`);
        }else{
            history.push('/products');
        }
    }
  return <>
                <MetaData title={`Search a Product  -- BAZAR`}/>
  
  <form className='searchBox' onSubmit={searchSubmitHandler} >
      <input type="text" placeholder='Search a Product...' onChange={e=>setkeyword(e.target.value)}/>
      <input type="submit" value="search" />
  </form>
  </>;
};

export default Search;
