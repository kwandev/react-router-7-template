import type { Db } from "mongodb";
import { MongoClient, ServerApiVersion } from "mongodb";

// 환경 확인
const isServer = typeof window === "undefined";

// MongoDB 연결 설정 (서버 환경에서만)
const MONGODB_URI = isServer ? process.env.MONGODB_URI || "" : "";
const DB_NAME = isServer ? process.env.MONGODB_DB_NAME || "" : "";

// 연결 관리를 위한 클래스
class MongoDBService {
  private _client?: MongoClient;
  private _db?: Db;
  private _connecting = false;

  constructor() {
    // 서버 환경에서만 process 이벤트 리스너 등록
    if (isServer) {
      this.setupProcessHandlers();
    }
  }

  get client() {
    return this._client;
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

  // DB connect
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
    if (this._client && this._db) {
      try {
        // 연결 상태 확인
        await this._client.db("admin").command({ ping: 1 });
        return { client: this._client, db: this._db };
      } catch {
        // 연결이 끊어진 경우 재연결
        this._client = undefined;
        this._db = undefined;
      }
    }

    // 연결 중인 경우 대기
    if (this._connecting) {
      while (this._connecting) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      return { client: this._client, db: this._db };
    }

    this._connecting = true;

    try {
      this._client = new MongoClient(MONGODB_URI, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        },
      });

      await this._client.connect();
      this._db = this._client.db(DB_NAME);

      console.log("✅ MongoDB 연결 성공!");
      return { client: this._client, db: this._db };
    } catch (error) {
      console.error("❌ MongoDB 연결 실패:", error);
      this._client = undefined;
      this._db = undefined;
      throw error;
    } finally {
      this._connecting = false;
    }
  }

  // DB disconnect
  async disconnect() {
    if (this._client) {
      await this._client.close();
      this._client = undefined;
      this._db = undefined;
      console.log("✅ MongoDB 연결 해제");
    }
  }

  // DB get
  async getDB(): Promise<Db> {
    if (!this._db) {
      await this.connect();
    }
    if (!this._db) {
      throw new Error("MongoDB 연결이 없습니다");
    }
    return this._db;
  }

  // DB get collection
  async getCollection(name: string) {
    const database = await this.getDB();
    return database.collection(name);
  }

  // DB check connection
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

export { mongoService };
