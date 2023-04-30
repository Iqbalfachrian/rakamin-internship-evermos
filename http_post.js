import http from 'k6/http';
import { check } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/2.2.0/dist/bundle.js";

export function handleSummary(data) {
    return {
      "post.html": htmlReport(data),
    };
  }

export default function () {
    const res = http.post('https://reqres.in/api/users');
    const payload = JSON.stringify({
        name: 'morpheus',
        job: 'leader'
    })

    const params = {
        headers: {
            'Content-type': 'application/json'
        },
    };

    const checkOutput = check(
        res,
        {
            'response code was 201': (res) => res.status == 201,
        },
    );
};