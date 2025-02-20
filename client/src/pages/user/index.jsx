import React, { useEffect, useState } from 'react'
import { GetAllMovies } from '../../api/movieApi'
import { ShowLoader, HideLoader } from '../../redux/loaderSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Input, Row, Col, message, Form } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

function Profile() {

    const dispatch = useDispatch()
    const [movies, setMovies] = useState(null)
    const [searchText, setSearchText] = useState(null)
    const [messageApi, contextHeader] = message.useMessage()
    const { loader } = useSelector(state => state.loaders)

    const getAllMovies = async () => {
        try {
            dispatch(ShowLoader())

            const res = await GetAllMovies()
            if (res.success){
                setMovies(res.data)
            }else{
                messageApi.open({
                    type: 'error',
                    content: res.message
                })
            }

            dispatch(HideLoader())
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllMovies()
    }, [])

    console.log("movies -> ", movies)

    const handleSearch = (e) => {
        setSearchText(e.target.value)
        console.log("search text -> ", searchText)
    }
  return (
    <> 
        {
            loader ? (<p>Loading...</p>) : (
                <>
                    <div className='d-flex justify-content-end p-20'>
                        <Row gutter={{ xs: 6, sm: 10, md: 12, lg: 16 }}>
                            <Col span={24}>
                                <Input type='text' placeholder='Search Movie' prefix={<SearchOutlined />} 
                                    style={{width: "300px"}}
                                    onChange={handleSearch}
                                />
                            </Col>
                        </Row>
                    </div>
                    <div className='d-flex justify-content-start p-20'>
                        <h2>New Releases</h2>     
                    </div>
                    <div className='card-container'>
                        <Row gutter={{ xs: 6, sm: 10, md: 12, lg: 16 }}>
                            
                            {
                              
                                movies ? (movies
                                    .filter((movie) => 
                                        !searchText || movie.movieName && movie.movieName.toLowerCase().includes(searchText.toLowerCase())
                                    )                                    
                                    .map((movie) => (
                                    //console.log(movie)
                                    <Col span={4}>
                                        <div className='card rounded-lg'>
                                            <a href='/api/movies' target='_blank'>
                                                <img className='card-img' src={movie.poster}/>
                                            </a>
                                            
                                        </div>
                                    </Col>
                                    
                                ))) : (
                                    <>
                                        <Col span={4}>
                                            <div className='card rounded-lg'>
                                                <p>No Movies Found</p>
                                            </div>
                                        </Col>
                                    </>
                                )
                            }
                            
                            
                        </Row>
                    </div>
                </>
            )
        }
        
        
    </>
  )
}

export default Profile