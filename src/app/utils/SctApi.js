import axios from 'axios';

const API_SERVER_URL = 'https://apisct.cloud';

const THUMBUP_LIST = '/thumbups/list';
const CONFIG = '/thumbups/config';
const DIVIDE = '/thumbups/divide';
const RECEIVE_TOPLIST = '/thumbups/receiveThumbupList';
const SEND_TOPLIST = '/thumbups/sendThumbupList';
const BADGE_LIST = '/badge/list';
const TAG_LIST = '/tagmanager/list';
const INFO = '/info';

export function getThumbUpList(author, permlink) {
    return axios.get(`${API_SERVER_URL}${THUMBUP_LIST}/${author}/${permlink}`);
}

export function getThumbupReceiveTopList(month) {
    return axios.get(`${API_SERVER_URL}${RECEIVE_TOPLIST}/${month}`);
}

export function getThumbupSendTopList(month) {
    return axios.get(`${API_SERVER_URL}${SEND_TOPLIST}/${month}`);
}

export function getBadgeList() {
    return axios.get(`${API_SERVER_URL}${BADGE_LIST}`);
}

export function getTagList() {
    return axios.get(`${API_SERVER_URL}${TAG_LIST}`);
}

export function getSctmPrice() {
    return axios.get(`${API_SERVER_URL}${INFO}/sctmprice`);
}

export function getReceivedSctm() {
    return axios.get(`${API_SERVER_URL}${INFO}/receivedSctm`);
}

export async function getConfig() {
    try {
        const config = await axios.get(`${API_SERVER_URL}${CONFIG}`);
        const divide = await axios.get(`${API_SERVER_URL}${DIVIDE}`);

        let configData = {};

        if (config && config.data && config.data[0]) {
            configData.receive_account = config.data[0].receive_account;
            configData.max_like_amount = config.data[0].max_like_amount;
        }

        divide.data.forEach(el => {
            switch (el.remark) {
                case 'Author':
                    configData.divide_author = el.rate;
                    break;
                case 'Thumbs up pool':
                    configData.divide_rewards = el.rate;
                    break;
                case 'Developer':
                    configData.divide_dev = el.rate;
                    break;
                case 'Burn':
                    configData.divide_burn = el.rate;
                    break;
            }
        });

        console.log(`sctapi getconfig load success`);
        return configData;
    } catch (e) {
        console.log(`sctapi getconfig fail to load`);
        console.log(e);
        // set default config
        return undefined;
    }
}
