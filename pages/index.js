import {
    ChakraProvider,
    Container,
    Box,
    Heading,
    Text,
    Stack,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Button,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    CloseButton,
    Divider,
    SlideFade,
    useDisclosure,
    background,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter, Code, Link
} from "@chakra-ui/react"
import {useState} from "react";
import isNumeric from "validator/lib/isNumeric"

export default function Home() {

    const [bac, setBac] = useState(0)
    const [ac, setAc] = useState(0)
    const [planCompleted, setPlanCompleted] = useState(0)
    const [actualCompleted, setActualCompleted] = useState(0)
    const [alert, setAlert] = useState(false)

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [pv, setPv] = useState(0)
    const [ev, setEv] = useState(0)
    const [spi, setSpi] = useState(0)
    const [sv, setSv] = useState(0)
    const [cpi, setCpi] = useState(0)
    const [tcpi, setTcpi] = useState(0)
    const [cv, setCv] = useState(0)

    const calculate = () => {
        const validate = isNumeric(bac.toString())
            && isNumeric(ac.toString())
            && isNumeric(planCompleted.toString())
            && isNumeric(actualCompleted.toString())

        if (!validate) {
            setAlert(true)
            return 0;
        }

        // calculate result
        setPv(bac * (planCompleted/ 100))
        setEv(bac * (actualCompleted / 100))
        setSpi(ev / pv)
        setSv(ev - pv)
        setCpi(ev / ac)
        setTcpi((bac - ev) / (bac - ac))
        setCv(ev - ac)

        //Trigger modal
        onOpen()

    }

  return (
    <ChakraProvider>
      <Container>
          <Heading marginY="2" textAlign="center">Manajemen Biaya Proyek</Heading>

          { alert === true &&
          <Alert status="error" rounded="md" marginY="2">
              <AlertIcon />
              <AlertDescription>Please input correct value</AlertDescription>
              <CloseButton position="absolute" right="8px" top="8px" onClick={() => setAlert(false)} />
          </Alert>
          }
              <Stack spacing={3} borderWidth={1} padding={4} rounded="md">
                  <Box>
                      <label htmlFor="bac">Budget at completion (BAC)</label>
                      <InputGroup>
                          <InputLeftElement
                              pointerEvents="none"
                              color="gray.300"
                              fontSize="1.2em"
                              children="$"
                          />
                          <Input type="number" placeholder="Budget at completion" id="bac" onChange={e => setBac(e.target.value)} />
                      </InputGroup>
                  </Box>

                  <Box>
                      <label htmlFor="ac">Actual cost (AC)</label>
                      <InputGroup>
                          <InputLeftElement
                              pointerEvents="none"
                              color="gray.300"
                              fontSize="1.2em"
                              children="$"
                          />
                          <Input type="number" placeholder="Actual cost" id="ac" onChange={e => setAc(e.target.value)} />
                      </InputGroup>
                  </Box>

                  <Box>
                      <label htmlFor="plan_completed">Plan completed percentage</label>
                      <InputGroup>
                          <InputRightElement
                              pointerEvents="none"
                              color="gray.300"
                              fontSize="1.2em"
                              children="%"
                          />
                          <Input type="number" placeholder="Plan completed percentage" id="plan_completed" onChange={e => setPlanCompleted(e.target.value)} />
                      </InputGroup>
                  </Box>

                  <Box>
                      <label htmlFor="actual_completed">Actual completed percentage</label>
                      <InputGroup>
                          <InputRightElement
                              pointerEvents="none"
                              color="gray.300"
                              fontSize="1.2em"
                              children="%"
                          />
                          <Input type="number" placeholder="Actual completed percentage" id="actual_completed" onChange={e => setActualCompleted(e.target.value)} />
                      </InputGroup>
                  </Box>

                  <Button colorScheme="teal" variant="outline" onClick={() => calculate()}>Calculate</Button>
              </Stack>

                <Box marginY={2}>
                    <Text textAlign="center">Dibuat menggunakan NextJS + ChakraUI</Text>
                    <Text textAlign="center">
                        <Link color="teal.400" href="https://github.com/nekoding" isExternal>@Nekoding</Link>
                    </Text>
                </Box>

          <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                  <ModalHeader>Result</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>

                      <Alert status="warning" rounded="md" marginY="2">
                          <AlertIcon />
                          <AlertDescription>Harap check ulang pekerjaan anda, saya tidak bertanggung jawab apabila perhitungan dibawah ini salah</AlertDescription>
                      </Alert>

                      <Stack spacing={2}>
                          <Box>
                              <Text as="u">Planned Value (PV)</Text>
                              <Box backgroundColor="gray.100" padding={2} rounded="md">
                                  <Text as="i" children="PV = BAC * Planned completed percentage" />
                                  <br />
                                  <Text as="i" children={`PV = ${bac.toLocaleString('Id-ID')} * ${planCompleted}%`} />
                                  <br />
                                  <Text as="i" children={`PV = ${pv.toLocaleString('Id-ID')}`} />
                              </Box>
                          </Box>
                          <Divider marginY={2}/>

                          <Box>
                              <Text as="u">Earned Value (PV)</Text>
                              <Box backgroundColor="gray.100" padding={2} rounded="md">
                                  <Text as="i" children="EV = BAC * Actual completed percentage" />
                                  <br />
                                  <Text as="i" children={`EV = ${bac.toLocaleString('Id-ID')} * ${actualCompleted}%`} />
                                  <br />
                                  <Text as="i" children={`EV = ${ev.toLocaleString('Id-ID')}`} />
                              </Box>
                          </Box>
                          <Divider marginY={2}/>

                          <Box>
                              <Text as="u">Schedule Performance Index (SPI)</Text>
                              <Box backgroundColor="gray.100" padding={2} rounded="md">
                                  <Text as="i" children="SPI = EV / PV" />
                                  <br />
                                  <Text as="i" children={`SPI = ${ev} / ${pv}`} />
                                  <br />
                                  <Text as="i" children={`SPI = ${spi}`} />
                              </Box>
                          </Box>
                          <Divider marginY={2}/>

                          <Box>
                              <Text as="u">Cost Performance Index (CPI)</Text>
                              <Box backgroundColor="gray.100" padding={2} rounded="md">
                                  <Text as="i" children="CPI = EV / AC" />
                                  <br />
                                  <Text as="i" children={`CPI = ${ev} / ${ac}`} />
                                  <br />
                                  <Text as="i" children={`CPI = ${cpi}`} />
                              </Box>
                          </Box>
                          <Divider marginY={2}/>

                          <Box>
                              <Text as="u">Schedule Variance (SV)</Text>
                              <Box backgroundColor="gray.100" padding={2} rounded="md">
                                  <Text as="i" children="SV = EV - PV" />
                                  <br />
                                  <Text as="i" children={`SV = ${ev} - ${pv}`} />
                                  <br />
                                  <Text as="i" children={`SV = ${sv}`} />
                              </Box>
                          </Box>
                          <Divider marginY={2}/>

                          <Box>
                              <Text as="u">Cost Variance (CV)</Text>
                              <Box backgroundColor="gray.100" padding={2} rounded="md">
                                  <Text as="i" children="CV = EV - AC" />
                                  <br />
                                  <Text as="i" children={`CV = ${ev} - ${ac}`} />
                                  <br />
                                  <Text as="i" children={`CV = ${cv}`} />
                              </Box>
                          </Box>
                          <Divider marginY={2}/>

                          <Box>
                              <Text as="u">To-complete Performance Index (TCPI)</Text>
                              <Box backgroundColor="gray.100" padding={2} rounded="md">
                                  <Text as="i" children="TCPI = (BAC - EV) / (BAC - AC)" />
                                  <br />
                                  <Text as="i" children={`TCPI = ((${bac} - ${ev}) / (${bac} - ${ac}))`} />
                                  <br />
                                  <Text as="i" children={`TCPI = ${tcpi}`} />
                              </Box>
                          </Box>
                          <Divider marginY={2}/>
                      </Stack>
                  </ModalBody>
              </ModalContent>
          </Modal>
      </Container>
    </ChakraProvider>
  )
}
