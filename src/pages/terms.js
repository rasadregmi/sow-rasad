import { Box, Button, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useMediaQuery } from '@chakra-ui/react'

const Terms = () => {
    const [termsContent, settermsContent] = useState([
        "BY",
        "clicking Invoice Now, you choose to register according to the information that you have typed in and the text on the registration page and the terms here, and you at the same time accept the terms here.",
        "You can use the program FOR FREE for 14 days.",
        "123 Fakturera is so easy and self-explanatory that the chance that you will need support is minimal, but if you should need support, we are here for you, with our office manned for the most part of the day. After the trial period, the subscription continues and costs SEK 99 excluding VAT per month, which is billed annually. If you do not want to keep the program, just cancel the trial period by giving notice before 14 days from registration.",
        "You have of course the right to terminate the use of the program without any costs, by giving us notice per email before 14 days from registration, that you do not want to continue with the program, and you then of course do not pay anything.",
        "If we do not receive such a notice from you before 14 days from registration, then the order, for natural reasons, cannot be changed. With registration it is meant the date and time when you did choose to press the button Invoice Now.",
        "Billing is for one year at a time.",
        "The price for 123 Fakturera (offer price SEK 99 per month / ordinary price SEK 159 per month) is for the annual fee Start for one year's use of the program.",
        "(When using the offer price of SEK 99, the one-year period is calculated from registration.)",
        "All prices are excluding. VAT.",
        "Offer, Inventory Control, Member Invoicing, Multiuser version and English printout are (or can be) additional modules that can be ordered later.",
        "Intermediation, as well as invoicing, may take place from K-Soft Sverige AB, Box 2826, 187 28 Täby. In the future, we may choose to cooperate with another company for e.g. intermediation and invoicing. However, the customer relationship is with us. The payment is made to the company from which the invoice comes.",
        "The annual fee is on a continuous basis, but if you do not wish to continue using the program, all you have to do is give notice thirty days before the start of the next one-year period.",
        "The introductory offer (SEK 99 per month) is for the annual fee Start for the first year. After the first year, the ordinary price is billed, which is currently, for annual fee Start, one hundred and fifty-nine kroner per month, for annual fee Remote control, three hundred kroner per month and for annual fee Pro, three hundred and thirty-three kroner per month. After one year, the annual Remote Control fee is invoiced as standard, but you can choose Start or Pro by giving notice at any time before the due date.",
        "If you choose to keep the program by not notifying us by email within 14 days of registration that you do not wish to continue with the program, you accept that you will pay the invoice for your order. Failure to pay the invoice or late payment does not give the right to cancel the order. We are happy to help you with logo at a cost price.",
        "License for the use of 123 Fakturera is of course sold in accordance with applicable laws.",
        "In order to be able to help you more easily and provide you with support, as well as to comply with the laws, we, for natural reasons, have to store your information.",
        "In connection with the storage of information, the law requires that we provide you with the following information:",
        "If you order as a private person, you have the right to cancel as stated by law. Your information is stored so that we can help you, etc. We will use it to be able to help you if you need help, follow the laws regarding bookkeeping, etc. When there are upgrades and the like, we may send you offers and the like about our products and services by email or the like. You may be contacted by email, post and telephone. If you don't want to be contacted, just send us an email about it.",
        "You can at any time ask not to be sent information about upgrades by email, letter or the like, and we will of course not do that. You send such a request to us by email, post or similar.",
        "For natural reasons, we have to store, process and move your data. Your information is stored until further notice. You give us permission to store, process and move your data, as well as to send you offers and the like by email, letter and the like. Due to the way it works with software, permission also needs to be given to other parties. The permission is therefore granted to us, as well as to the companies and/or person(s) who own the software, the source code, the website and the like. It is also given to current and future companies owned and/or controlled by one or more of those who currently own and/or control us. It is also given to current and future companies owned and/or controlled by one or more of those who currently own and/or control the companies (if any), which own or will own the software, source code, website and the like. It is also given to current and future persons (if any) who own or will own the software, source code, website and the like. This applies both to current and future products and services. It is also given to another company, (like K-Soft Sverige AB), which we can use to send/sell products, upgrades and the like, either by intermediation or otherwise.",
        "You of course have the right to request access to, change and deletion of the information we hold about you. You also have the right to request restriction of data processing, and to object to data processing and the right to data portability. You have the right to complain to the supervisory authority. You can find more legal information about us here. The laws of Ireland are the applicable laws. Placing an order is of course completely voluntary. Of course, we do not use any automated profiling or decisions.",
        "If you wish to contact us, please use the information on this website.",
        "Click on Invoice Now to register according to the information you have entered and the terms here. (Date and time of admission are entered automatically in our registers.)",
        "Our experience is that our customers are very satisfied with the way we work and hope and believe that this will also be your experience.",
        "Have a great day!"
      ])
      const [isLargerThan900] = useMediaQuery('(min-width: 900px)')
  return (
    <Box position="relative" minH="100vh" overflow="hidden">
      <Box
        position="fixed"
        width="100%"
        height="100vh"
        zIndex={-100}
        backgroundImage="url('https://storage.123fakturera.se/public/wallpapers/sverige43.jpg')"
        backgroundSize="cover"
        backgroundPosition="top center"
        backgroundRepeat="no-repeat"
        backgroundAttachment="fixed"
      />
      <Navbar />
      <Box
        display="flex"
        flexDirection="column"
        marginTop="1rem"
        justifyContent="center"
        alignItems="center"
      >
        <Text color="white" fontWeight="bold" fontSize="24px">
          Terms
        </Text>
        <Button
          background="rgb(8, 158, 30)"
          borderRadius="3rem"
          fontSize="1.125em"
          marginTop="1.5rem"
          fontWeight="500"
          color="white"
          padding="1.7rem 4rem"
          maxW="270px"
          _hover={{ background: "rgb(8, 158, 30)" }}
          onClick={() => window.close()}
        >
          Close and Go Back
        </Button>

        <Box
          padding="40px"
          background="white"
          width={isLargerThan900? "750px":"90%"}
          borderRadius="20px"
          lineHeight="1.5em"
          fontWeight="500"
          marginTop="2rem"
          marginBottom="2rem"
        >
          <Box class="back-terms" color="rgba(0, 0, 0, 0.6)" textAlign="center">
            <Text color="rgba(0, 0, 0, 0.6)">
              <b>{termsContent[0]}</b> {termsContent[1]}
            </Text>
            <Text class="">{termsContent[2]}</Text>
            <Text class="">
             {termsContent[3]}
            </Text>
            <Text marginTop="1.5rem">
                {termsContent[4]}
            </Text>
            <Text>
                {termsContent[5]}
            </Text>
            <Text marginTop="1.5rem">{termsContent[6]}</Text>
            <Text class="">
              {termsContent[7]}
            </Text>
            <Text class="">
              {termsContent[8]}
            </Text>
            <Text class="">{termsContent[9]}.</Text>
            <Text class="">
              {termsContent[10]}
            </Text>
            <Text class="">
              {termsContent[11]}
            </Text>
            <Text class="">
              {termsContent[12]}
            </Text>
            <Text class="">
                {termsContent[13]}
            </Text>
            <Text class="">
                {termsContent[14]}
            </Text>
            <Text class="">
            {termsContent[15]}
            </Text>
            <Text class="">
            {termsContent[16]}
            </Text>
            <Text class="">
            {termsContent[17]}
            </Text>
            <Text class="">
            {termsContent[18]}
            </Text>
            <Text class="">
            {termsContent[19]}
            </Text>
            <Text class="">
            {termsContent[20]}
            </Text>
            <Text class="">
            {termsContent[21]}
            {termsContent[22]}
              {termsContent[23]}
            </Text>
            <Text class="">
            {termsContent[24]}
            </Text>
            <Text class="">
            {termsContent[25]}
            </Text>
            <Text class="">{termsContent[26]}</Text>
          </Box>
        </Box>
        <Button
          background="rgb(8, 158, 30)"
          borderRadius="3rem"
          fontSize="1.125em"
          marginTop="1.5rem"
          fontWeight="500"
          color="white"
          padding="1.7rem 4rem"
          maxW="270px"
          marginBottom="3rem"
          _hover={{ background: "rgb(8, 158, 30)" }}
          onClick={() => window.close()}
        >
          Close and Go Back
        </Button>
      </Box>
    </Box>
  );
};

export default Terms;
