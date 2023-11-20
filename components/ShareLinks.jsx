import React from 'react';
import {
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    FacebookShareButton, LinkedinIcon, LinkedinShareButton,
    TelegramIcon,
    TelegramShareButton,
    TwitterIcon,
    TwitterShareButton, ViberIcon, ViberShareButton, WhatsappIcon, WhatsappShareButton
} from "next-share";
import {useRouter} from "next/router";
import {Title} from "@/components/index";

const ShareLinks = ({size=32,title}) => {
    const { asPath  } = useRouter()
    const link = "http://localhost:3000" + asPath
    return (
        <div className={"flex flex-col justify-center items-center"}>
            <Title text={title}/>
            <div className={"w-full flex items-center justify-around flex-wrap"}>
                <FacebookShareButton
                    url={link}
                    quote={'Share event with your Facebook followers'}
                    hashtag={'#nestbest'}
                >
                    <FacebookIcon size={size} round />
                </FacebookShareButton>
                <ViberShareButton
                    url={'https://github.com/next-share'}
                    title={'Share event with your Viber contacts'}
                >
                    <ViberIcon size={size} round />
                </ViberShareButton>
                <TelegramShareButton
                    url={link}
                    title={'Share event with your Telegram contacts'}
                >
                    <TelegramIcon size={size} round />
                </TelegramShareButton>

                <TwitterShareButton
                    url={link}
                    title={'Share event with your Twitter followers'}
                >
                    <TwitterIcon size={size} round />
                </TwitterShareButton>

                <WhatsappShareButton
                    url={link}
                    title={'Share event with your Whatsapp contacts'}
                    separator=":: "
                >
                    <WhatsappIcon size={size} round />
                </WhatsappShareButton>
                <LinkedinShareButton url={link}>
                    <LinkedinIcon size={size} round />
                </LinkedinShareButton>

                <a
                    href={`mailto:?to=${encodeURIComponent(link)}&subject=${encodeURIComponent('Look at the event ')}&body=${encodeURIComponent(`I want to invite you to invite you to event ${link}`)}`}
                >
                    <EmailIcon size={40} round />
                </a>

            </div>
        </div>

    );
};

export default ShareLinks;