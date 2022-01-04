import {useRef, useState, useEffect} from 'react'

const Control = (props) => {
	let [classNamePauseOrPlay, setClassNamePauseOrPlay] = useState("fas fa-play icon-play"); //mặc định sẽ ko play
	const [positionSong, setPositionSong] = useState(props.positionSong); //vị trí bài hát
	const {isPlaying, setIsPlaying} = props; //lây props cha truyền xuống
	const [active, setActive] = useState({
   		reloadActive: false,
   		randomActive: false,

   	});





	const handleOnlickPlay = () => {
		setIsPlaying(!isPlaying); 
		
		// console.log(classNamePauseOrPlay)
	}
	//next pre
	const handleOnclick = (type) => {
		setIsPlaying(true); 
		props.nextOrPre(type)
	}
	useEffect(() => {
		isPlaying === true ? setClassNamePauseOrPlay("fas fa-pause") : setClassNamePauseOrPlay("fas fa-play icon-play") 
	}, [isPlaying])

	//reaload song 

	// console.log(positionSong)
	const handleRansomListSong = () => {
		setActive({...active, randomActive: !active.randomActive})
		props.randomListSong(!active.randomActive);
	}

	return(
	    <div className="control">
	      <div className={active.reloadActive == true ? "btn btn-repeat active" : "btn btn-repeat"} onClick={() =>(props.reloadSong(), setActive({...active, reloadActive: !active.reloadActive}))}>
	        <i className="fas fa-redo"></i>
	      </div>
	      <div className="btn btn-prev" onClick={() => handleOnclick("pre")}>
	        <i className="fas fa-step-backward"></i>
	      </div>
	      <div className="btn btn-toggle-play" onClick={() => handleOnlickPlay()}> 
	        <i className={classNamePauseOrPlay}></i>
	      </div>
	      <div className="btn btn-next" onClick={() => handleOnclick("next")}>
	        <i className="fas fa-step-forward"></i>
	      </div>
	      <div className={active.randomActive == true ? "btn btn-random active" : "btn btn-random" } onClick={() =>handleRansomListSong()}>
	        <i className="fas fa-random"></i>
	      </div>
	    </div>
	)
}

export default Control;