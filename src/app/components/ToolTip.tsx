'use client'
import React from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import { PlusIcon, QuestionMarkIcon } from '@radix-ui/react-icons';

interface HintProps {
    text: string;
    url?:  string;
}

/**
 * HelpTip component. Displays a help tip icon that shows a tooltip with the provided text. Optional URL to open a new tab.
 * If there is a URL, the help text will be appended with a message to click the icon to learn more. 😉
 * @param text
 * @param url
 * @example <HelpTip text="This is a hint 🦊" url="https://example.com" />
 */

const HelpTip: React.FC<HintProps> = ({text, url}) => {
    if (url) {
        // Add a click to learn more text to the hint
        text = `${text} Click '?' to learn more.`;
    }
    const handleClick = () => {
        window.open(url, '_blank')
    };
    return (
        <Tooltip.Provider>
            <Tooltip.Root>
                <Tooltip.Trigger asChild>
                    <button className="text-violet11 shadow-blackA4 hover:bg-violet3 inline-flex h-[25px] w-[25px] items-center justify-center rounded-full bg-white shadow-[0_2px_10px] outline-none focus:shadow-[0_0_0_2px] focus:shadow-black">
                        <QuestionMarkIcon onClick={handleClick} />
                    </button>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                    <Tooltip.Content
                        className="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-violet11 select-none rounded-[4px] bg-white px-[15px] py-[10px] text-[15px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]"
                        sideOffset={10}
                    >
                        {text}

                        <Tooltip.Arrow className="fill-white" />
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip.Root>
        </Tooltip.Provider>
    );
};

export default HelpTip;