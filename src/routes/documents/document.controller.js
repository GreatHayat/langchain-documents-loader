const fs = require("fs");
const { uniqBy } = require("lodash");
const { Router } = require("express");
const { DocxLoader } = require("langchain/document_loaders/fs/docx");
const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");
const { SupabaseVectorStore } = require("langchain/vectorstores/supabase");
const uploadFile = require("../../middlewares/upload");
const asyncHandler = require("../../middlewares/asyncHandler");
const supabaseClient = require("../../utils/supabaseClient");
const {
  generateRandomId,
  generateOpenAIEmbeddings,
} = require("../../utils/helpers");

class DocumentsController {
  static router;

  static getRouter() {
    this.router = Router();

    this.router.get("/", asyncHandler(this.getDocuments));
    this.router.post(
      "/",
      uploadFile.single("file"),
      asyncHandler(this.uploadDocuments)
    );
    return this.router;
  }

  static async getDocuments(req, res) {
    const { data, error } = await supabaseClient
      .from("documents")
      .select(`id, metadata`);
    if (error) {
      return res.status(400).json({ error: true, message: error?.message });
    }

    let response = data?.map((item) => item?.metadata);
    response = uniqBy(response, "metadata.id");

    res.status(200).json({ success: true, documents: response });
  }

  static async uploadDocuments(req, res) {
    const {
      file,
      body: { title },
    } = req;

    if (!file) {
      return res.status(400).json({ error: true, message: "File is required" });
    }

    const loader = new DocxLoader(file?.path);
    const fileData = await loader.load();

    const textSplitter = new RecursiveCharacterTextSplitter({
      separators: "\n\n",
      chunkSize: 1000,
      chunkOverlap: 200,
    });
    const docs = await textSplitter.splitDocuments(fileData);
    fs.unlinkSync(file?.path);

    const randomId = generateRandomId();
    const texts = docs?.map((doc) => doc?.pageContent);
    const metadata = docs?.map((doc) => ({ id: randomId, title }));

    const embeddings = generateOpenAIEmbeddings();
    await SupabaseVectorStore.fromTexts(texts, metadata, embeddings, {
      client: supabaseClient,
      tableName: "documents",
      queryName: "match_documents",
    });

    res.status(200).json({
      success: true,
      message:
        "Document Uploaded Successfully, You can start chat with your document.",
    });
  }
}

module.exports = DocumentsController;
