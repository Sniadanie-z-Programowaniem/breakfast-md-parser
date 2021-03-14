import { HostToken, SocialHandlerToken } from './types';

import { Tokens } from 'marked';
import { linkFromListItem } from '../utils';

const parseSocialLink = (socialLink: Tokens.Link): SocialHandlerToken => {
    const twitterHandler =
        (socialLink.href.match(/\btwitter\.com\b/) && socialLink.href) || undefined;
    const githubHandler =
        (socialLink.href.match(/\bgithub\.com\b/) && socialLink.href) || undefined;
    const linkedInHandler =
        (socialLink.href.match(/\blinkedin\.com\b/) && socialLink.href) || undefined;

    const webPage =
        [twitterHandler, githubHandler, linkedInHandler].filter(Boolean).length <= 0
            ? socialLink.href
            : undefined;

    return {
        githubHandler,
        twitterHandler,
        linkedInHandler,
        webPage,
    };
};

export const parseHost = (item: Tokens.ListItem): HostToken => {
    const socialLink = linkFromListItem(item);

    if (!socialLink) {
        return {
            name: item.text.trim(),
        };
    }

    return {
        name: socialLink.text.trim(),
        ...parseSocialLink(socialLink),
    };
};
