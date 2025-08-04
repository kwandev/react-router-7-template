import type { Db } from "mongodb";
import { MongoClient, ServerApiVersion } from "mongodb";

// 환경 확인
const isServer = typeof window === "undefined";

// MongoDB 연결 설정 (서버 환경에서만)
const MONGODB_URI = isServer ? process.env.MONGODB_URI || "" : "";
const DB_NAME = isServer ? process.env.MONGODB_DB_NAME || "" : "";

// 연결 관리를 위한 클래스
class MongoDBService {
  private client?: MongoClient;
  private db?: Db;
  private connecting = false;

  constructor() {
    // 서버 환경에서만 process 이벤트 리스너 등록
    if (isServer) {
      this.setupProcessHandlers();
    }
  }

  private setupProcessHandlers() {
    const gracefulShutdown = async (signal: string) => {
      console.log(`${signal} 신호 수신. MongoDB 연결을 정리합니다...`);
      await this.disconnect();
      process.exit(0);
    };

    process.on("SIGINT", () => gracefulShutdown("SIGINT"));
    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
  }

  async connect() {
    // 브라우저 환경에서는 에러 반환
    if (!isServer) {
      throw new Error("MongoDB 연결은 서버 환경에서만 가능합니다");
    }
    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined");
    }
    if (!DB_NAME) {
      throw new Error("DB_NAME is not defined");
    }

    // 이미 연결되어 있으면 기존 연결 반환
    if (this.client && this.db) {
      try {
        // 연결 상태 확인
        await this.client.db("admin").command({ ping: 1 });
        return { client: this.client, db: this.db };
      } catch {
        // 연결이 끊어진 경우 재연결
        this.client = undefined;
        this.db = undefined;
      }
    }

    // 연결 중인 경우 대기
    if (this.connecting) {
      while (this.connecting) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      return { client: this.client, db: this.db };
    }

    this.connecting = true;

    try {
      this.client = new MongoClient(MONGODB_URI, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        },
      });

      await this.client.connect();
      this.db = this.client.db(DB_NAME);

      console.log("✅ MongoDB 연결 성공!");
      return { client: this.client, db: this.db };
    } catch (error) {
      console.error("❌ MongoDB 연결 실패:", error);
      this.client = undefined;
      this.db = undefined;
      throw error;
    } finally {
      this.connecting = false;
    }
  }

  async disconnect() {
    if (this.client) {
      await this.client.close();
      this.client = undefined;
      this.db = undefined;
      console.log("✅ MongoDB 연결 해제");
    }
  }

  async getDB(): Promise<Db> {
    if (!this.db) {
      await this.connect();
    }
    if (!this.db) {
      throw new Error("MongoDB 연결이 없습니다");
    }
    return this.db;
  }

  async getCollection(name: string) {
    const database = await this.getDB();
    return database.collection(name);
  }

  async checkConnection(): Promise<boolean> {
    if (!isServer) return false;

    try {
      const { client } = await this.connect();
      if (!client) {
        return false;
      }
      await client.db("admin").command({ ping: 1 });
      return true;
    } catch {
      return false;
    }
  }
}

// 싱글톤 인스턴스
const mongoService = new MongoDBService();
// 서비스 인스턴스도 익스포트 (고급 사용을 위해)
export { mongoService };

// 기존 API 호환성을 위한 익스포트
export const connectDB = () => mongoService.connect();
export const disconnectDB = () => mongoService.disconnect();
export const getDB = () => mongoService.getDB();
export const getCollection = (name: string) => mongoService.getCollection(name);
export const checkConnection = () => mongoService.checkConnection();
