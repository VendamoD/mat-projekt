import React, { useState } from "react"
import { Alert as ChakraAlert, Text, AlertDescription, AlertIcon, AlertTitle, FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, Button, Center, Stack, Link } from "@chakra-ui/react"
import { useUserContext } from "./userContext"

export function Signup() {
  //const signup = useAuth(signup => signup.signup)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { register } = useUserContext()
  const [isError, setIsError] = useState(false)
  const [isSent, setIsSent] = useState(false)

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    register(email, password)
  }

  return (
    <>
      <Center>
        <Stack>
          {
            isSent ? isError ? <ChakraAlert marginTop={4} status='error'>
              <AlertIcon />
              <AlertTitle >Registrace neproběhla úspěšně.</AlertTitle>
              <AlertDescription>Špatné heslo nebo email.</AlertDescription>
            </ChakraAlert > : <ChakraAlert marginTop={4} status='success'>
              <AlertIcon />
              Registrace proběhla úspěšně.
              <Link color='blue.500' href='./Login'>
                Pokračuj zde.
              </Link>
            </ChakraAlert> : ""
          }
          <FormControl paddingTop={5}>
            <FormLabel>Email</FormLabel>
            <Input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Heslo</FormLabel>
            <Input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          <Button backgroundColor="blue.300" onClick={async (e) => {
            e.preventDefault();
            const loginErr = await register(email, password)
            console.log(loginErr)
            if (!loginErr) {
              setIsError(true);
            } else {
              setIsError(false);

            }
            setIsSent(true);
          }}>Registrovat</Button>
          <Text>
            Máš už vytvořená účet? {' '}
            <Link color='blue.500' href='./Login'>
              Přihlas se zde
            </Link>
          </Text>
        </Stack>
      </Center>
    </>
  )
}
