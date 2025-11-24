import config from "../conf/config";
import { Client, Databases, ID, Storage, Query, TablesDB } from "appwrite";

export class Service {
    client = new Client();
    databases;
    storage;
    constructor() {
        this.client
            .setEndpoint(config.appWriteURL)
            .setProject(config.appWriteProjectId);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                config.appWriteDatabaseId,
                config.appWriteTableId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    }

    async updatePost(slug, { title, content, featuredImage, status, }) {
        try {
            return await this.databases.updateDocument(
                config.appWriteDatabaseId,
                config.appWriteTableId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,

                }
            )
        } catch (error) {
            console.log(`update error: ${error}`)
            throw error;
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                config.appWriteDatabaseId,
                config.appWriteTableId,
                slug,

            )
            return true;
        } catch (error) {
            console.log(`Deletion error: ${error}`)
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(slug);
        } catch (error) {
            console.log(`error getting post : ${error}`);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", "equal")]) {
        try {
            return await this.databases.listDocuments(
                config.appWriteDatabaseId,
                config.appWriteTableId,
                queries,

            )
        } catch (error) {
            console.log(`errro listing posts: ${error}`);
            return false;
        }
    }


    
    //file uploads
    async uplaodFile(file) {
        try {
            return await this.storage.uplaodFile(
                config.appWriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log(`error uploading file: ${error}`);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            this.storage.deleteFile(
                config.appWriteBucketId,
                fielId
            )
            return true;
        } catch (error) {
            console.log(`Error deleting file: ${error}`);
            return false;
        }
    }

    getFilePreview(fileId) {
        try {
            return this.storage.getFilePreview(
                config.appWriteBucketId,
                fileId
            )
        } catch (error) {
            console.log(`error getting preview: ${error}`)
            return true;
        }
    }
}


const service = new Service();
export default service;