// This will export to HTML as filename "result.html" AND also stdout using the text summary
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/2.2.0/dist/bundle.js";

import http from 'k6/http';
import { check, sleep } from 'k6';



const BASE_URL = 'https://regres.in';

export function handleSummary(data) {
    return {
      "results.html": htmlReport(data),
    };
  }

export let options = {
    vus: 10,
    duration: '30s',
    iterations: 3500,
};

//create user
export default function testCreateUser() {
    const url = 'https://regres.in/api/users';
    const payload = JSON.stringify({
        name: 'Morpheus',
        job: 'Leader'
    });

    const params = {
        header: {
            'Content-type': 'application/json'
        },
    };

    const res = http.post (url, payload, params);
    check(res, {
        'response status is 201': (r) => r.status == 201,
        'response status is less than 2s': (r) => r.timings.duration < 2000,
    });

    sleep(1);
}

//update user
export function updateUser() {
    const url = 'https://regres.in/api/users/2';
    const payload = JSON.stringify({
        name: 'Morpheus',
        job: 'Zion Resident'
    });

    const params = {
        headers: {
            'Content-type': 'application/json'
        },
    };

    const res = http.put(url, payload, params);
    check(res, {
        'response status is 200': (r) => r.status == 200,
        'response time is less than 2s': (r) => r.timings.duration < 2000,
    });

    sleep(1);
}