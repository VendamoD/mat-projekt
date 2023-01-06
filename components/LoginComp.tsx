import React, { useRef, useState } from "react"
import { Alert as ChakraAlert, Text, AlertDescription, AlertIcon, AlertTitle, FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, Button, Center, Stack, Link } from "@chakra-ui/react"
import { useUserContext } from "./userContext"

export function LoginComp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const { login } = useUserContext();

  return (
    <Center>
      <Stack>
        {
          isError ? <ChakraAlert status='error'>
            <AlertIcon />
            <AlertTitle>Přihlášení se nezdařilo.</AlertTitle>
            <AlertDescription>Špatné heslo nebo email.</AlertDescription>
          </ChakraAlert> : ""
        }
        <FormControl paddingTop={5}>
          <FormLabel>Email address</FormLabel>
          <Input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormControl>
        <Button backgroundColor="blue.300" onClick={async (e) => {
          e.preventDefault();
          const loginErr = await login(email, password)
          console.log(loginErr)
          if (!loginErr) {
            setIsError(true);
          } else {
            setIsError(false);
          }
        }}>Login</Button>
        <Text>
          Nemáš ještě vytvořený účet?{' '}
          <Link color='blue.500' href='./Register'>
            Registruj se zde
          </Link>
        </Text>
      </Stack>
    </Center>
  )
}