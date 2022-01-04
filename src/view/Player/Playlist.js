import React,{useRef, useState, useEffect, useCallback} from 'react'




const Playlist = (props) => {
	const {listSong,positionSong,onChangSong} = props;

	const [positionScroll, setPositionScroll] = useState(0);

	// console.log(positionSong)
	useEffect(() => {
		console.log("<<<<<<position", positionSong)
		if(positionSong === 0){
			window.scrollTo(0, 0);

		}else{
			if(positionSong === 1) return window.scrollTo(0, positionSong * 110)
			window.scrollTo(0, 110 +(positionSong - 1) * 83)
		}

	}, [positionSong])

	useEffect(() => { //QUAY VỀ VỊ TRÍ CŨ KHI RELAOD
			window.onbeforeunload = function () { //có mới trở về 0
			  window.scrollTo(0, 0);
			}
	})


	return(
		<div className="playlist" style={{marginTop: 410, padding: 12}}>
			{listSong && listSong.length > 0 &&
				listSong.map((item, index) =>{
					return(
					    <div className='song' key={index} style={{backgroundColor: index === positionSong ? "red" : ""}} onClick={() => (onChangSong(index))}>
					      <div className="thumb" style={{backgroundImage: "url(" +  item.img_src  + ")" }}>
					      </div>
					      <div className="body">
					        <h3 className="title">{item.title}</h3>
					        <p className="author">{item.artist}</p>
					      </div>
					      <div className="option">
					        <i className="fas fa-ellipsis-h"></i>
					      </div>
						  
					    </div>
					)

				})
			}
		</div>
	)
}

export default React.memo(Playlist);