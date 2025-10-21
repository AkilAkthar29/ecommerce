🛍️ E-Commerce Scalability Demo (Spring Boot + HTML + JS)

This project is a Spring Boot-based mini e-commerce demo that illustrates how a scalable backend can serve product data efficiently using in-memory caching, stats tracking, and a modern UI built with HTML, CSS, and JavaScript.

🚀 Features

Backend: Spring Boot 3 (Java 17)

RESTful APIs for products and system stats

In-memory “database” of 10 sample products

In-memory cache simulation for faster repeated fetches

Statistics tracking (totalRequests, cacheHits, dbHits, cacheHitRatio)

Frontend: Plain HTML, CSS, and JavaScript

Dynamic product grid

Product detail view

System Stats dashboard

Responsive, clean UI with hover effects

Demonstrates:

Caching and scalability concept in web backends

Difference between DB hits and cache hits

REST API integration with front-end fetch calls

📁 Project Structure
ecommerce/
│
├── src/
│   ├── main/
│   │   ├── java/com/java/ecommerce/
│   │   │   └── ProductController.java        # Backend controller
│   │   ├── resources/
│   │   │   ├── static/
│   │   │   │   ├── index.html                # Frontend UI
│   │   │   │   ├── style.css                 # Styles
│   │   │   │   ├── script.js                 # Frontend logic
│   │   │   │   └── images/                   # Product images
│   │   │   └── application.properties        # Config (port, encoding)
│   └── test/
│
├── pom.xml                                   # Maven dependencies
└── README.md                                 # Project documentation

⚙️ Setup & Run
1️⃣ Prerequisites

Java 17 or later

Maven 3.9+

Any code editor (VS Code / IntelliJ IDEA)

2️⃣ Clone and Build
git clone https://github.com/<your-username>/<your-repo>.git
cd ecommerce
mvn clean package

3️⃣ Run the Application
# Option 1: Maven
mvn spring-boot:run

# Option 2: Run the packaged JAR
java -jar target/ecommerce-0.0.1-SNAPSHOT.jar


Once started, open your browser at:
👉 http://localhost:8080

If port 8080 is already in use, open
src/main/resources/application.properties
and set server.port=8081.

🧠 How It Works
Backend (Spring Boot)

/api/products → returns all product data

/api/products/{id} → returns a specific product

First request simulates DB fetch (slow)

Subsequent requests use cache (fast)

/api/stats → returns real-time stats:

{
  "totalRequests": 12,
  "cacheHits": 8,
  "dbHits": 4,
  "cacheHitRatio": "66.67%",
  "serverTime": "2025-10-22T07:45:12Z"
}

Frontend (HTML/JS)

List All Products: Displays grid of product cards.

Click Product Card: Shows details fetched from backend.

System Stats Button: Calls /api/stats and displays results.

🖼️ UI Preview
Product Grid	Product Details	System Stats

	
	

(Add your screenshots under /docs/screens/ if you like.)

🧪 API Endpoints
Endpoint	Method	Description
/api/products	GET	List all products
/api/products/{id}	GET	Get a product by ID
/api/stats	GET	Get system statistics
🏗️ Technologies Used

Backend: Spring Boot 3.5.6, Java 17

Frontend: HTML5, CSS3, JavaScript (ES6)

Build Tool: Maven 3.9

Others: In-memory cache, ConcurrentHashMap, AtomicLong

📊 Scalability Concept

This demo shows how caching improves scalability:

Action	Backend Fetch	Effect
First request for a product	From “DB” (simulated slow)	Increases dbHits
Subsequent same product requests	From “Cache”	Increases cacheHits
System Stats	Shows improvement ratio	Demonstrates caching

Use this pattern to understand real-world scalability optimizations in large e-commerce systems.

🧰 Troubleshooting
Issue	Solution
Port 8080 already in use	Stop existing process or set server.port=8081 in application.properties.
Build fails	Run mvn clean compile and check for red compile errors.
Encoding of ₹ shows wrong	Add server.servlet.encoding.charset=UTF-8 in application.properties.
Frontend shows undefined stats	Restart backend to ensure /api/stats returns correct JSON.
🧑‍💻 Author

Akil Akthar
📧 akilakthar29@gmail.com

🌐 [LinkedIn / GitHub profile link]


