import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'smoking_data.json');

export class TrackerService {
  constructor() {
    this.ensureDataFile();
  }

  async ensureDataFile() {
    try {
      await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
      try {
        await fs.access(DATA_FILE);
      } catch {
        await fs.writeFile(DATA_FILE, '{}');
      }
    } catch (err) {
      console.error('Error initializing data file:', err);
    }
  }

  async getData() {
    try {
      const data = await fs.readFile(DATA_FILE, 'utf8');
      return JSON.parse(data);
    } catch (err) {
      return {};
    }
  }

  async saveData(data) {
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
  }

  async addCigarette() {
    const data = await this.getData();
    const today = new Date().toISOString().split('T')[0];
    data[today] = (data[today] || 0) + 1;
    await this.saveData(data);
    return { date: today, count: data[today] };
  }

  async getStats() {
    const data = await this.getData();
    const today = new Date().toISOString().split('T')[0];
    const todayCount = data[today] || 0;
    
    const entries = Object.values(data);
    const average = entries.length ? 
      entries.reduce((sum, count) => sum + count, 0) / entries.length : 0;

    return {
      today: { date: today, count: todayCount },
      average: Number(average.toFixed(1)),
      history: data
    };
  }
}

export default new TrackerService();