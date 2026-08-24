# GenAI Project Interview Questions and Answers

This guide is based on the following resume projects:

- PO Closure BOT
- Data Catalogue Refresh
- PDP pension dashboard
- SMBF backend services
- Claims insurance portal

## 1. PO Closure BOT

### Q1. Explain the PO Closure BOT project.

**Answer:**
The PO Closure BOT was an AI-driven automation solution for identifying purchase orders that were ready to be closed. It automated vendor communication, follow-ups, reporting, and savings tracking. Python handled the application logic, Snowflake stored and processed enterprise data, Airflow orchestrated scheduled workflows, and AWS services supported cloud execution and integration.

### Q2. Where was AI used in the PO Closure BOT?

**Answer:**
AI was used to analyze purchase-order information and supporting business data, identify closure candidates, and assist with vendor communication and follow-up decisions. The exact implementation should be explained honestly: if the solution used an LLM, I would mention the model and prompting approach; if it used classification or business rules, I would describe those components instead of calling them generative AI.

### Q3. How did the bot decide whether a PO could be closed?

**Answer:**
The workflow collected relevant PO attributes such as order status, received quantity, invoice status, pending exceptions, and vendor responses. It then applied validation logic and, where applicable, AI-based interpretation to classify the PO as ready to close, requiring follow-up, or requiring human review. Sensitive or ambiguous cases were routed for manual approval.

### Q4. How did the bot communicate with vendors?

**Answer:**
The system generated or selected appropriate communication based on the PO status. It sent initial requests, tracked responses, and triggered follow-ups when a response was not received within the required period. In a GenAI implementation, the message would be generated from a controlled prompt and approved business data, with templates and validation to prevent unsupported claims.

### Q5. How did you handle hallucinations or incorrect AI decisions?

**Answer:**
The system should restrict the model to verified PO data, use structured outputs, validate important fields, and apply business rules before taking action. High-impact decisions such as closing a PO should include confidence thresholds, exception handling, audit logs, and human approval. The model should not independently invent vendor, invoice, or savings information.

### Q6. How did Airflow fit into the architecture?

**Answer:**
Airflow orchestrated the workflow as a sequence of tasks. It scheduled data extraction, PO analysis, vendor communication, response checking, reporting, and savings updates. It also provided retries, dependency management, monitoring, and failure recovery.

### Q7. Why would you use Snowflake in this project?

**Answer:**
Snowflake provided a centralized and scalable platform for PO data, vendor information, workflow results, reporting, and historical analysis. It supported SQL-based transformations and allowed business users to query trusted data. Access control and role-based permissions could be applied to protect sensitive procurement data.

### Q8. How would you measure the success of the PO Closure BOT?

**Answer:**
I would measure closure accuracy, reduction in manual effort, processing time, vendor response rate, follow-up completion rate, false closure rate, exception rate, and realized savings. For any GenAI component, I would also track groundedness, response quality, human override rate, latency, and cost per workflow.

## 2. Data Catalogue Refresh

### Q9. Explain the Data Catalogue Refresh project.

**Answer:**
The project improved enterprise data discovery and accessibility by providing AI-powered search over catalogue information. Snowflake Cortex Search handled search capabilities, Python implemented the application and data-processing logic, and Streamlit provided the user interface. Users could find relevant datasets and metadata more efficiently than with basic keyword searches.

### Q10. What is Snowflake Cortex Search?

**Answer:**
Snowflake Cortex Search is a managed search capability for finding relevant records in enterprise data. It can support semantic understanding and hybrid search, allowing users to search by meaning as well as exact terms. This is useful for discovering datasets when users do not know the precise table, column, or business terminology.

### Q11. What is the difference between keyword search and semantic search?

**Answer:**
Keyword search looks for exact words or close text matches. Semantic search represents text as vectors and finds content with similar meaning, even when different words are used. For example, a search for "employee pay" may find metadata containing "salary information" through semantic similarity.

### Q12. How would you implement a RAG solution for the data catalogue?

**Answer:**
First, catalogue descriptions, table metadata, column definitions, and access information would be cleaned and indexed. A user query would be converted into a search request. Relevant metadata would be retrieved using semantic or hybrid search, filtered according to the user's permissions, and passed to an LLM as context. The LLM would generate an answer grounded in the retrieved records and provide dataset references.

### Q13. How would you improve poor search results?

**Answer:**
I would improve metadata quality, add business synonyms, tune indexing and ranking, use hybrid search, apply metadata filters, adjust chunking or document boundaries, and add reranking where necessary. I would evaluate results using a labelled set of user queries and track precision, recall, relevance, and user feedback.

### Q14. How did Streamlit fit into the solution?

**Answer:**
Streamlit provided a lightweight interface for users to enter searches, view relevant catalogue results, inspect metadata, and potentially ask follow-up questions. Python connected the interface to Snowflake services and displayed the returned results in a readable form.

### Q15. How would you secure enterprise catalogue search?

**Answer:**
I would enforce identity-based authentication, role-based authorization, row and column access policies, secure secrets management, and audit logging. Search results and retrieved context must be filtered according to the user's permissions before being sent to an LLM. Sensitive metadata should not be exposed through prompts or responses.

## 3. PDP Pension Dashboard

### Q16. How is the PDP project relevant to a GenAI role?

**Answer:**
PDP demonstrates the cloud and backend engineering skills required to productionize GenAI systems. I worked with AWS Lambda, SQS, SNS, API Gateway, DynamoDB, Step Functions, S3, and Python. These skills are relevant for building asynchronous inference workflows, event-driven pipelines, APIs, document processing, and reliable model integrations.

### Q17. How could you add GenAI to the pension dashboard?

**Answer:**
A controlled assistant could explain pension information using approved data retrieved from the system. The architecture could use API Gateway and Lambda for requests, Step Functions for orchestration, DynamoDB for conversation or request state, S3 for documents, and a retrieval layer to provide grounded context. Sensitive financial decisions would require strict validation and human review.

## 4. SMBF Backend Services

### Q18. What backend skills from SMBF support GenAI development?

**Answer:**
SMBF provided experience with FastAPI, Flask, MongoDB, Pandas, NumPy, Docker, and Kubernetes. These skills support the development of model-serving APIs, data-processing pipelines, containerized services, scalable deployments, and scheduled background jobs.

### Q19. How would you deploy a GenAI API using your SMBF experience?

**Answer:**
I would expose the service through FastAPI, validate requests with typed schemas, call the model or retrieval service, and return a structured response. The service would be packaged with Docker and deployed on Kubernetes with health checks, resource limits, autoscaling, logging, metrics, and secure configuration.

## 5. Claims Project

### Q20. How is the Claims project relevant to GenAI?

**Answer:**
The Claims project involved Python, Node.js, MongoDB, Azure APIM, third-party APIs, and document retrieval services. These are directly relevant to document-based GenAI systems because claims workflows often require extracting information from documents, retrieving supporting records, integrating external services, and exposing secure APIs.

### Q21. How could GenAI be used in an insurance claims workflow?

**Answer:**
GenAI could summarize claim documents, extract structured fields, classify claim types, retrieve relevant policy clauses, and assist claim handlers. The system should cite source documents, validate extracted values, protect personal information, and keep a human in the approval loop for final claim decisions.

### Q22. How would you prevent sensitive claims data from being exposed?

**Answer:**
I would use Azure APIM policies, authentication and authorization, encryption, private networking where available, secrets management, data minimization, redaction of unnecessary personal information, audit logging, and strict access control on retrieval results. Prompts and model responses should also be monitored for accidental sensitive-data leakage.

## 6. Cross-Project GenAI Questions

### Q23. What is the difference between RAG and fine-tuning?

**Answer:**
RAG retrieves current and relevant information at query time and provides it to the model as context. Fine-tuning changes the model's weights using a specialised dataset. RAG is usually better for frequently changing enterprise knowledge, while fine-tuning is useful for consistent behaviour, formatting, or domain-specific language. They can also be used together.

### Q24. How would you evaluate an enterprise GenAI application?

**Answer:**
I would evaluate retrieval relevance, answer correctness, groundedness, completeness, citation accuracy, refusal behaviour, latency, cost, and safety. Evaluation should include automated test sets, human review, production feedback, and regression tests for important scenarios.

### Q25. How would you reduce GenAI latency and cost?

**Answer:**
I would reduce unnecessary context, use an appropriate model size, cache repeated requests, use efficient retrieval, stream responses when useful, batch offline processing, set token limits, and route simple requests to cheaper models. Monitoring would identify expensive prompts, slow dependencies, and repeated failures.

### Q26. How would you prevent prompt injection?

**Answer:**
I would treat retrieved documents and user input as untrusted data, separate instructions from data, validate tool parameters, restrict available tools, enforce authorization outside the LLM, filter suspicious content, and require confirmation for high-impact actions. The model should never be the only security boundary.

### Q27. Describe a production-grade architecture for your GenAI projects.

**Answer:**
A production architecture would include an authenticated API, request validation, an orchestration layer, document or metadata ingestion, search and retrieval, an LLM service, output validation, business-rule checks, observability, audit logging, and human review for high-risk actions. AWS, Azure, or Snowflake services could provide the event processing, storage, search, monitoring, and access-control layers.

### Q28. What should you clarify about your AI experience in an interview?

**Answer:**
I should clearly distinguish between generative AI, predictive machine learning, rule-based automation, semantic search, and standard backend engineering. I should name the actual models, APIs, embedding systems, prompts, evaluation methods, and production responsibilities I used. I should avoid claiming hands-on experience with a technology unless I can explain its implementation and trade-offs.

## Important Preparation Note

Before the interview, replace general descriptions with your actual implementation details:

- Model or AI service used
- Prompting or classification approach
- Data sources and document types
- Retrieval and ranking method
- AWS, Azure, or Snowflake components used
- Security and access-control design
- Evaluation metrics and measured business results
- Human approval and exception-handling process
