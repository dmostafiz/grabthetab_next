import Axios from '@/Helpers/Axios'
import { Avatar, Box, Flex, Text } from '@chakra-ui/react'
import Cookies from 'js-cookie'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'

export default function HomeLayout({ children }) {

    const [sponsor, setSponsor] = useState(null)

    useEffect(() => {
        async function getSponsor() {

            const username = Cookies.get('sponsor')

            const res = await Axios.get(`/sponsor/validate/${username}`)

            // console.log('Sponsor data: ', res.data)

            if (res?.data?.ok) {
                setSponsor(res?.data?.user)
            }
        }

        getSponsor()
    }, [])


    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>GrabTheTab</title>
                <meta name="description" content />
                <meta name="title" content />
                <meta name="keywords" content />
                <link href="/asset3/css/bootstrap.min.css" rel="stylesheet" />
                <link href="/asset3/css/style.css" rel="stylesheet" />
                <link href="/asset3/fonts/fonts.css" rel="stylesheet" />
                <link href="/asset3/css/responsive.css" rel="stylesheet" />
                <link rel="icon" type="image/x-icon" href="/favicon.webp" />
                <link href="/asset3/css/fontawesome.min.css" rel="stylesheet" />

                <script src="/asset3/js/jquery-3.6.0.min.js"></script>
                <script src="/asset3/js/bootstrap.bundle.min.js"></script>
                <script src="/asset3/js/ofi.min.js"></script>
                <script src="/asset3/js/script.js"></script>
                <script src="/facebook-pixel.js"></script>
            </Head>

            {children}

            {sponsor && <Box as='section' position={'fixed'} zIndex='9999' bottom='12px' left='12px' bg='white' shadow={'md'} px='3' py={1} rounded='full'>
                <Flex gap={2} alignItems='center'>
                    <Avatar size='sm' src={sponsor?.avatar} />
                    <Box lineHeight={1}>
                        <Text mb={0} lineHeight={1} fontSize={'9px'} color='gray.500'>Referred by</Text>
                        <Text as={'span'} fontSize={'14px'}>{sponsor.full_name}</Text>
                    </Box>

                </Flex>
            </Box>}
        </>
    )
}
