import React from 'react'

const Search = ({ lookup }) => {
  return (
    <div className="ui search">
      <div className="ui icon input">
        <input className="prompt" onChange={lookup}/>
        <i className="search icon" />
      </div>
    </div>
  )
}

export default Search
