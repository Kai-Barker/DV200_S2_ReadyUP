


const Tag = ({tagText}) => {
    return (
        <div style={{width:'auto', height:'6vh', border:'2px solid #EDE4F1', borderRadius:'10px', padding: '1vh'}}>
            <p style={{margin:'0px', color:'#EDE4F1'}}>
                {tagText}
            </p>
        </div>
    )
}

export default Tag;