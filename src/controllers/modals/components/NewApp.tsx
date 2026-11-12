import styled from "styled-components";

import { Modal } from "@revoltchat/ui";

import heroImage from "../../../assets/images/new-app-hero.webp";

import { modalController } from "../ModalController";
import { ModalProps } from "../types";

const WEB_APP_URL = "https://stoat.chat/app";
const DESKTOP_APP_URL = "https://stoat.chat/download";

const Hero = styled.div`
    height: 220px;
    flex-shrink: 0;
    overflow: hidden;

    padding: 1.5rem 0 0 1.5rem;

    background: linear-gradient(135deg, #3b3150 0%, #2a233a 60%);

    img {
        display: block;
        width: 135%;
        max-width: none;

        border-top-left-radius: var(--border-radius);
        box-shadow: 0 0 24px rgba(0, 0, 0, 0.4);
    }
`;

const Body = styled.div`
    padding: 1.25rem 1.5rem;

    display: flex;
    flex-direction: column;
    gap: 0.75rem;

    h1 {
        margin: 0;
        font-size: 1.5rem;
        font-weight: 700;
        line-height: 1.25;
        color: var(--foreground);
    }

    p {
        margin: 0;
        line-height: 1.5;
        color: var(--secondary-foreground);
    }
`;

export default function NewApp({ onClose, signal }: ModalProps<"new_app">) {
    const isDesktop = typeof window.native === "object";

    return (
        <Modal
            actions={[
                {
                    palette: "accent",
                    children: isDesktop ? "Download now" : "Switch now",
                    onClick: () => {
                        modalController.openLink(
                            isDesktop ? DESKTOP_APP_URL : WEB_APP_URL,
                            true,
                        );
                        return true;
                    },
                },
                {
                    palette: "plain",
                    children: "Not now",
                    onClick: () => true,
                },
            ]}
            onClose={onClose}
            signal={signal}
            padding="0"
            maxWidth="480px">
            {
                (
                    <>
                        <Hero>
                            <img src={heroImage} draggable={false} />
                        </Hero>
                        <Body>
                            <h1>{"This app is going away"}</h1>
                            <p>
                                {isDesktop
                                    ? "This version of the desktop app is no longer being developed and will stop working in the future. Download the current Stoat desktop app to keep using Stoat."
                                    : "This version of Stoat is no longer being developed and will be shut down in the future. The current Stoat app is available at stoat.chat/app."}
                            </p>
                            <p>
                                {
                                    "Voice channels, video calls and screen sharing are only available in the current app. Your account, servers and messages are already there, so just sign in."
                                }
                            </p>
                        </Body>
                    </>
                ) as any
            }
        </Modal>
    );
}
