import React, {useEffect} from 'react';
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

const ShareLinks = ({size=32,title,quote}) => {
    const { asPath  } = useRouter()
    const link = process.env.NEXT_PUBLIC_INTERNAL_URI + asPath;

    return (
        <div className={"flex flex-col justify-center items-center"}>
            <Title text={title}/>
            <div className={"w-full flex items-center justify-around flex-wrap"}>
                <FacebookShareButton
                    url={link}
                    quote={quote}
                    hashtag={'#nestbest'}
                >
                    <FacebookIcon size={size} round />
                </FacebookShareButton>
                <ViberShareButton
                    url={link}
                    title={quote}
                >
                    <ViberIcon size={size} round />
                </ViberShareButton>
                <TelegramShareButton
                    url={link}
                    title={quote}
                >
                    <TelegramIcon size={size} round />
                </TelegramShareButton>

                <TwitterShareButton
                    url={link}
                    title={quote}
                >
                    <TwitterIcon size={size} round />
                </TwitterShareButton>

                <WhatsappShareButton
                    url={link}
                    title={quote}
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
                    <EmailIcon size={size} round />
                </a>

            </div>
        </div>

    );
};

export default ShareLinks;