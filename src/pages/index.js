import Axios from '@/Helpers/Axios'
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from '@chakra-ui/react'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import HomeLayout from '../Layout/HomeLayout'

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [sponsord, setSponsed] = useState()

  const [username, setUsername] = useState(null)
  const toast = useToast()

  useEffect(() => {
    const sponsor = Cookies.get('sponsor')
    if (!sponsor) {
      onOpen()
    } else {
      setSponsed(sponsor)
    }
  }, [])

  const handleVerify = async () => {
    if (!username) {
      return alert('Please enter a username')
    }

    const res = await Axios.get(`/sponsor/validate/${username}`)

    if (!res?.data?.ok) {

      return toast({
        title: 'Sponsor verification failed',
        description: "",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })

    }
    else {
      Cookies.set('sponsor', username)
      toast({
        title: 'Sponsor verified',
        description: "",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })

      setTimeout(() => {
        window.location.href = `/`
      }, 500)
    }
  }

  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [email, setEmail] = useState()
  const [phoneNumber, setPhoneNumber] = useState()

  const handleSubmit = async () => {

    const sponsor = Cookies.get('sponsor')

    if (!sponsor) {

      toast({
        title: 'Please verify your sponsor!',
        description: "",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })

      return onOpen()
    }

    if (!firstName || !lastName || !email || !phoneNumber) {
      return toast({
        title: 'All fields are required!',
        description: "",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }

    const res = await Axios.post('/contact', {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone_number: phoneNumber,
      sponsorId: sponsor,
      contactHost: 'grabthetab'
    })

    if (res?.data?.ok) {
      Cookies.remove('sponsor')
      window.location.href = `https://shopxcelerate.com/${sponsor}`
    } else {
      toast({
        title: 'Oopss!',
        description: res?.data?.msg,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })

      Cookies.remove('sponsor')

      setTimeout(() => {
        window.location.href = `/`
      }, 500)

    }

  }

  return (
    <HomeLayout>
      <header className="header" style={{ padding: 10 }}>
        <div style={{ padding: '0 20px' }}>
          <img src="https://xceleratefueltabs.com/landing/images/logo.png" />
          <a href="/login" style={{ float: 'right', padding: 9, background: 'white', textDecoration: 'none', color: 'black', borderRadius: 10, marginTop: 10 }}>Login
            Now</a>
        </div>
      </header>
      <div className="content">
        <div className="main-banner">
          <div className="container">
            <div className="main-title">
              <h2><span>Get YOUR</span> piece of the <span>$13 BILION</span> AutoCare Industry</h2>
            </div>
            <div className="autocare">
              <div className="autocare-list">
                <div className="autocare-block block1">
                  <div className="icon">
                    <img src="/asset3/images/care-icon.png" alt="care" className="img-fluid" />
                  </div>
                  <div className="text">
                    <h6>Cleans Fuel
                      System &amp; Engine</h6>
                    <p>Increase fuel efficiency and
                      reduce maintenance</p>
                  </div>
                </div>
                <div className="autocare-block block2">
                  <div className="icon">
                    <img src="/asset3/images/care-icon.png" alt="care" className="img-fluid" />
                  </div>
                  <div className="text">
                    <h6>Reduce
                      Carbon Build Up</h6>
                    <p>Better performance.
                      Smoother running</p>
                  </div>
                </div>
                <div className="autocare-block block3">
                  <div className="icon">
                    <img src="/asset3/images/care-icon.png" alt="care" className="img-fluid" />
                  </div>
                  <div className="text">
                    <h6>Increases
                      Horsepower</h6>
                    <p>More overall
                      power and torque.</p>
                  </div>
                </div>
                <div className="autocare-block block4">
                  <div className="icon">
                    <img src="/asset3/images/care-icon.png" alt="care" className="img-fluid" />
                  </div>
                  <div className="text">
                    <h6>Extends Life of Engine</h6>
                    <p>Longer Life.
                      Bigger Savings.</p>
                  </div>
                </div>
                <div className="autocare-block block5">
                  <div className="icon">
                    <img src="/asset3/images/care-icon.png" alt="care" className="img-fluid" />
                  </div>
                  <div className="text">
                    <h6>Cleaner Oil</h6>
                    <p>Less wear and friction</p>
                  </div>
                </div>
                <div className="autocare-block block6">
                  <div className="icon">
                    <img src="/asset3/images/care-icon.png" alt="care" className="img-fluid" />
                  </div>
                  <div className="text">
                    <h6>Increase Fuel
                      Economy</h6>
                    <p>More miles to the gallon
                      / Km to the liter.</p>
                  </div>
                </div>
                <div className="autocare-block block7">
                  <div className="icon">
                    <img src="/asset3/images/care-icon.png" alt="care" className="img-fluid" />
                  </div>
                  <div className="text">
                    <h6>Decreases harmful
                      Emissions</h6>
                    <p>Reduce your carbon
                      footprint on the environment.</p>
                  </div>
                </div>
              </div>
              <div className="auto-img">
                <div className="lines">
                  <div className="line line1" />
                  <div className="line line2" />
                  <div className="line line3" />
                  <div className="line line4" />
                </div>
                <div className="circle">
                  <img src="/asset3/images/circle.png" alt="circle" className="img-fluid" />
                </div>
                <div className="image d-none d-md-block">
                  <img src="/asset3/images/product-img.png" alt="product-img" className="img-fluid" />
                </div>
                <div className="image d-flex d-md-none">
                  <div className="img1">
                    <img src="/asset3/images/pro1.png" alt="product-img" width={254} className="img-fluid" />
                  </div>
                  <div className="img2">
                    <img src="/asset3/images/pro2.png" alt="product-img" width={155} className="img-fluid" />
                  </div>
                  <div className="img3">
                    <img src="/asset3/images/pro3.png" alt="product-img" width={196} className="img-fluid" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="business-sec">
          <div className="container">
            <div className="main-title black-title">
              <h2>Products you need. <span>A business you deserve.</span></h2>
            </div>
            <div className="row align-items-center">
              <div className="col-sm-12 col-md-12 col-lg-7">
                <div className="business-video">
                  <div className="video-block" data-video="https://www.youtube.com/embed/FNhS5RhpKDg?autoplay=1&showinfo=0&modestbranding=1&rel=0&mute=1">
                    <div className="v-poster">
                      <img src="/img.webp" alt="video-bg" className="img-fluid" />
                    </div>
                    <iframe className="video embed-player slide-media" id="video" width={520} height={360} src frameBorder={0} allowTransparency="true" allowFullScreen muted="true" />
                    <a href="javascript:void(0)" className="play-btn" id="play-button">
                      <i className="fas fa-play" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-5">
                <div className="business-form">
                  <span>Start Your Business Today!</span>
                  <h2>Our Vehicle is the second largest
                    investment after our home</h2>
                  <span>Fill out the form below for more information</span>
                  <div>

                    <input type="hidden" name="sponsor_username" defaultValue="{{ $sponsor }}" />
                    <div className="form-group">
                      <input type="text" className="form-control" onChange={e => setFirstName(e.target.value)} value={firstName} placeholder="Your first name" />
                    </div>
                    <div className="form-group">
                      <input type="text" className="form-control" onChange={e => setLastName(e.target.value)} value={lastName} placeholder="Your last name" />
                    </div>
                    <div className="form-group">
                      <input type="text" onChange={e => setPhoneNumber(e.target.value)} value={phoneNumber} className="form-control" placeholder="Phone Number" />
                    </div>
                    <div className="form-group">
                      <input type="email" className="form-control" onChange={e => setEmail(e.target.value)} value={email} placeholder="Email Address" />
                    </div>
                    <p>Your Information will never be shared. Unsubscribe any time.</p>

                    <button onClick={handleSubmit} className="btn btn-primary">SUBMIT NOW</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="benefits">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-6">
                <div className="row">
                  <div className="col-sm-12 col-md-6 col-lg-12">
                    <div className="benefit-left">
                      <h2>You Could Earn:</h2>
                      <div className="benefit-list">
                        <div className="b-label">
                          BENEFITS
                        </div>
                        <div className="b-block">
                          <div className="icon">
                            <img src="/asset3/images/icon1.png" alt="icon" width={37} className="img-fluid" />
                          </div>
                          <h3>Up to 35% commissions</h3>
                        </div>
                        <div className="b-block">
                          <div className="icon">
                            <img src="/asset3/images/icon2.png" alt="icon" width={36} className="img-fluid" />
                          </div>
                          <h3>Bonuses and free vacations</h3>
                        </div>
                        <div className="b-block">
                          <div className="icon">
                            <img src="/asset3/images/icon3.png" alt="icon" width={34} className="img-fluid" />
                          </div>
                          <h3>Residual commissions on all re-orders</h3>
                        </div>
                        <div className="b-block">
                          <div className="icon">
                            <img src="/asset3/images/icon4.png" alt="icon" width={23} className="img-fluid" />
                          </div>
                          <h3>Free Products</h3>
                        </div>
                        <div className="b-block">
                          <div className="icon">
                            <img src="/asset3/images/icon5.png" alt="icon" width={38} className="img-fluid" />
                          </div>
                          <h3>Fuel Savings Plus</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-6 col-lg-12">
                    <div className="benefit-left">
                      <div className="get-list">
                        <h2>What you get:</h2>
                        <ul>
                          <li>Free training and support</li>
                          <li>Free e-commerce website</li>
                          <li>Free Landing pages and marketing system</li>
                          <li>Free backoffice and management tools</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-6">
                <div className="benefit-image">
                  <img src="/asset3/images/benefit.png" alt="benefit" className="img-fluid" />
                  <div className="bg-img">
                    <img src="/asset3/images/img-b.png" alt="benefit" className="img-fluid" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader borderBottom={'1px'} borderColor='gray.300'>
            Who reffered you?
          </ModalHeader>
          {/* <ModalCloseButton /> */}
          <ModalBody>

            <FormControl isRequired>
              <FormLabel>Sponsor username</FormLabel>
              <Input value={username} onChange={e => setUsername(e.target.value)} placeholder='Enter sponsor username' />
            </FormControl>

          </ModalBody>

          <ModalFooter borderTop={'1px'} borderColor='gray.300' as={'sponsor'}>
            <Button onClick={handleVerify} colorScheme='blue'>Submit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </HomeLayout >
  )
}
