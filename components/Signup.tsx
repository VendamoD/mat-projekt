import React, { useState } from "react"
import { Alert as ChakraAlert, Text, AlertDescription, AlertIcon, AlertTitle, FormControl, FormLabel, Input, Button, Center, Stack, Link, ListItem, UnorderedList } from "@chakra-ui/react"
import { useUserContext } from "./userContext"

export function Signup() {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("")
  const { register } = useUserContext()
  const [isError, setIsError] = useState(false)
  const [isSent, setIsSent] = useState(false)

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
            <FormLabel>Jméno</FormLabel>
            <Input type='text' value={username} isRequired onChange={(e) => setUsername(e.target.value)} />
            <FormLabel>Email</FormLabel>
            <Input type='email' value={email} isRequired onChange={(e) => setEmail(e.target.value)} />
            <FormLabel>Heslo</FormLabel>
            <UnorderedList>
              <ListItem>Heslo musí obsahovat minimálně 6 znaků</ListItem>
            </UnorderedList>
            <Input type='password' value={password} isRequired onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          <Button backgroundColor="blue.300" onClick={async (e) => {
            e.preventDefault();
            const loginErr = await register(email, password, username)
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
