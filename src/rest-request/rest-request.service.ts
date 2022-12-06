import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class RestRequestService {
    public async getCorreios(codigo_pacote: string) {
        const result = await axios.get('https://api.linketrack.com/track/json?user=teste&token=1abcd00b2731640e886fb41a8a9671ad1434c599dbaa0a0de9a5aa619f29a83f&codigo=' + codigo_pacote);
        return result.data;
    }
}
