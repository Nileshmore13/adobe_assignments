import { Box, Center, Text } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setUserCount } from '../redux';
import { server } from '../server';

const UserAnalytics = () => {

    const dispatch = useDispatch();
    const count = useSelector((state)=>state.app.userCount) 
    console.log('count: ', count);

    const getUserCount = ()=>{
        axios.get(`${server}/analytics/users`).then((res)=>dispatch(setUserCount(+res.data.message)))
    } 

    useEffect(()=>{
        getUserCount()
    },[])
  return (
    <Box>
        <Center><Text fontSize="xl" color="black">No Of Users {count}</Text></Center>
        <Box>
            
        </Box>
    </Box>
  )
}

export default UserAnalytics
