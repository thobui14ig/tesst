import "./Player.css";
import Playlist from "./Playlist";
import Control from "./Control";
import {useRef, useState, useEffect} from 'react'


const Player = (props) => {

	const audio = useRef(null);
    const [isPlaying, setIsPlaying] 		= useState(false);
    const [rotateImage, setRotateImage] 	= useState(false); //xoay ảnh
    const [positionSong, setPositionSong] 	= useState(0)
    const [playIng, setPlayIng] 			= useState(0); //thanh tiến độ bài hát
	const [checkRandom, setCheckRandom]		= useState(false)
	//ham random bai hat
	const randomIndex = () => {
		const index = Math.trunc(Math.random() * props.listSong.length);
		setPositionSong(index)	
	}
    // console.log(props.listSong.length)
    useEffect(() => {

        if (isPlaying) {
            audio.current.play();
            setRotateImage(true)
        } else {
            audio.current.pause();
            setRotateImage(false)
        }


    });


    //currentTime hiển thị thời gina bắt đầu phát
    //duration: thời lượng bài hát
    useEffect(() => {

    	const a = audio.current.ontimeupdate = function(){     //update theo thời gian phát
    		let percentCurent = (audio.current.currentTime * 100) / audio.current.duration;
    		if(percentCurent === 100){
				if(checkRandom) return randomIndex();// nếu có ramdom thì cho vào hàm random
    			if(positionSong + 1 === props.listSong.length) return setPositionSong(0) //nếu index bài hát lớn hơn bài hát cuối cùng
    			return setPositionSong(positionSong + 1)
    			
    		}
    		setPlayIng(percentCurent);  		
    	}


    	
    }, [positionSong])
   
    //tua bài hát
    const handleChangePlay = (e) => {
    	console.log(e.target.value) //giá trị tua dc lấy lên
    	let curentSecond = (e.target.value * audio.current.duration) / 100
    	audio.current.currentTime = curentSecond;


    }






    //next or pre
    const nextOrPre = (type) => {
		if(checkRandom) return randomIndex();
    	if(type === "pre"){
    		if(positionSong == 0){
    			setPositionSong(0)
    		}else{
    			setPositionSong(positionSong - 1)
    		}	
    	}else if(type === "next"){
    		if(positionSong + 1 == props.listSong.length) return setPositionSong(0) ;
    		setPositionSong(positionSong + 1)
    		
    	}

    }
    //khi click vào bài hát
    const onChangSong = (position) => {
    	setIsPlaying(true)
    	setPositionSong(position)
    }

    //reload bài hát

    const reloadSong = () => {
    	audio.current.currentTime = 0; //khi reload cho bài hát về 0
    }

	//ramdom bai hát
	const randomListSong = (value) => {
		value == true ? setCheckRandom(true) : setCheckRandom(false)		
	}

	return(
		<div className="player">
		  
		  <div className="dashboard">
		   
		    <header>
		      <h4>Đang phát</h4>
		      <h2>{props.listSong[positionSong].title}</h2>
		    </header>

		    
		    <div className="cd">
		      <div className={rotateImage === false ? "cd-thumb" : "cd-thumb cd-play" } style={{backgroundImage: "url(" +  props.listSong[positionSong].img_src  + ")"}} >
		      </div>
		    </div>

		    <Control
		     isPlaying={isPlaying}
		     setIsPlaying={setIsPlaying}
		     positionSong={positionSong}
		     nextOrPre={nextOrPre}
		     reloadSong={reloadSong}
			 randomListSong={randomListSong}
		     />
		   


		    <input id="progress" className="progress" type="range" step="1" onChange={(e) => handleChangePlay(e)} value={playIng ? playIng : 0}  min="1" max="100" />

	        <audio src={props.listSong[positionSong].src} ref={audio}/>
		  </div>

		  <Playlist
		   listSong={props.listSong}
		   positionSong={positionSong}
		   onChangSong={onChangSong}
		   />
		</div>
	)
}

export default Player;