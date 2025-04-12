import React from 'react'
import { useState, useEffect } from 'react'
import { ShowLoader, HideLoader } from '../../redux/loaderSlice'
import { useDispatch } from 'react-redux'
import { GetMovieById } from '../../api/movieApi'
import { GetAllTheatersByMovie } from '../../api/showApi'
import { message, Row, Col,Input, Button } from 'antd'
import { useParams, useSearchParams } from 'react-router-dom'
import moment from 'moment'

const SingleMovie = () => {

    const [messageApi, contextHeader] = message.useMessage()
    const [selectedMovie, setSelectedMovie] = useState(null)
    const [allTheatersByMovie, setAllTheatersByMovie] = useState(null)
    const [loader, setLoader] = useState(true)
   

    const dispatch = useDispatch()

    const { id } = useParams()
    const [searchParamDate, setSearchParamDate] = useSearchParams()
    const [date, setDate] = useState(null)
    
    
    const getMovieById = async () => {
        try {
            
            dispatch(ShowLoader())
            
            const res = await GetMovieById(id)
            if (res.success){
                setSelectedMovie(res.data)
                messageApi.open({
                    type: "success",
                    content: res.message
                })
            }else{
                messageApi.open({
                    type: "error",
                    content: res.message
                })
            }

            setLoader(false)
            dispatch(HideLoader())
        } catch (error) {
            console.log(error)
            messageApi.open({
                type: "error",
                content: "Some error occured"
            })
            dispatch(HideLoader())
        }
    }

    const getTheaterByMovie = async () => {
        try {
            dispatch(ShowLoader())
            
            const searchDate = searchParamDate.get('date')
            //update url
            searchParamDate.set('date', searchDate)
            setSearchParamDate(searchParamDate)

            setDate(searchParamDate.get('date'))

            console.log("search param date ", searchParamDate)
            const res = await GetAllTheatersByMovie({movie: id, date: searchDate})
            if (res.success)
            {
                setAllTheatersByMovie(res.data)
            }else{
                messageApi.open({
                    type: "error",
                    content: res.message
                })
            }

            dispatch(HideLoader())
          
        } catch (error) {
            messageApi.open({
                type: "error",
                content: "Some error occured"
            })
        }
    }

    const handleOnChange = (e) => {
        searchParamDate.set('date', e.target.value)
        setSearchParamDate(searchParamDate)
        setDate(searchParamDate.get('date'))
    }

    useEffect(() => {
        getMovieById()
        getTheaterByMovie()
    }, [])

    useEffect(() => {
        getTheaterByMovie()
    }, [date])

  return (
    <>
    {contextHeader}
       {
         loader ? (<h3>Loading...</h3>) : (
            <>
                
                    <Row className='margin-50 rounded-lg shadow-lg bg-white-500 p-20'>
                       
                            <Col span={8} className='border-r-grey'>
                                <div>
                                        <img
                                            className='card-img'
                                            src={selectedMovie.poster} 
                                            alt={selectedMovie.movieName}/>
                                </div>
                            </Col>
                          
                            <Col span={16} className='text-align-left p-l-20'>
                                <div> 
                                    <h1>{selectedMovie.movieName}</h1>
                                </div>
                                <div className='margin-t-10'>
                                    <p><span className='text-grey-500'>Language: </span>{selectedMovie.language}</p>
                                    
                                    <p><span className='text-grey-500'>Genre: </span>{selectedMovie.genre}</p>
                                    
                                    <p><span className='text-grey-500'>Release Date: </span>{moment(selectedMovie.releaseDate).format("DD-MM-YYYY")}</p>
                                    
                                    <p><span className='text-grey-500'>Duration: </span>{selectedMovie.duration} Minutes</p>
                                </div>
                            </Col>
                        
                    </Row>
                    <hr className='margin-50'/>
                    <Row className='margin-50'>
                        <Col span={2} className='text-align-left'>
                            <label >Choose the date: </label>
                        </Col>
                        <Col span={8}>
                            <Input type='date' value={date} onChange={handleOnChange}></Input>
                        </Col>
                    </Row>

                    <div className='margin-50 text-align-left' >
                        <h2>Theaters</h2>
                        {/* {console.log(allTheatersByMovie)}
                        {
                            allTheatersByMovie && (() => {
                                console.log("condition")
                                const theaterWithShows = allTheatersByMovie.filter(theater => 
                                    theater.shows && theater.shows.length > 0
                                )

                                console.log("Theater With Shows -> ", theaterWithShows)
                                if (theaterWithShows.length == 0)
                                {
                                    return <h3 color='primary'>Unfortunately! No theaters available.</h3>
                                }

                                return theaterWithShows.map((theater) => {
                                    <>
                                        <Row className='margin-10 rounded-lg shadow-lg bg-white-500 p-20' >
                                            <Col span={24}>
                                                <h3>{theater.theaterName}</h3>
                                                <p>{theater.address}</p>
                                                <br/>
                                            </Col>
                                            <div style={{width:"100%"}} >
                                                <Row>
                                                {
                                                    theater.shows
                                                    .map((show) => {
                                                        return (
                                                            <>
                                                                <Col span={2}  className='justify-center'>
                                                                    <Button>{show.time}</Button>
                                                                </Col>
                                                            </>
                                                        )
                                                    })
                                                }
                                                </Row>
                                            </div>
                                        </Row>
                                    </>
                                
                            
                                })


                            })



                            
                        } */}


                        {
                            allTheatersByMovie && (() => {
                                const theatersWithShows = allTheatersByMovie.filter(theater => theater.shows && theater.shows.length > 0)

                                if (theatersWithShows.length === 0) {
                                    return <h3>Unfortunately! No theaters available.</h3>
                                }

                                return theatersWithShows.map((theater, index) => (
                                    <Row key={index} className='margin-10 rounded-lg shadow-lg bg-white-500 p-20'>
                                        <Col span={24}>
                                            <h3>{theater.theaterName}</h3>
                                            <p>{theater.address}</p>
                                            <br/>
                                        </Col>
                                        <div style={{ width: "100%" }}>
                                            <Row>
                                                {
                                                    theater.shows.map((show, showIndex) => (
                                                        <Col key={showIndex} span={2} className='justify-center'>
                                                            <Button>{show.time}</Button>
                                                        </Col>
                                                    ))
                                                }
                                            </Row>
                                        </div>
                                    </Row>
                                ))
                            })()
                        }

                    </div>
                
            </>
         )
       }
        
    </>
  )
}

export default SingleMovie