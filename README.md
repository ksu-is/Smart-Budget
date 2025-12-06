# Smart-Budget
SmartBudget is a personal finance tracker that uses AI to help people understand and improve their spending habits. It automatically categorizes expenses, predicts future spending, and offers friendly, conversational insights instead of just numbers. Built with Python, pandas, and Flask or Streamlit.

## Features
- Automatic expense categorization
- AI-powered spending insights and friendly tips
- Predicts future spending and net balance
- Visual dashboard with charts (income, expenses, categories)
- CSV import/export
- Simple, modern UI (Flask, Chart.js)
- Works offline (local JSON storage)

## Quickstart
1. Clone this repo:
   ```sh
   git clone https://github.com/ksu-is/Smart-Budget.git
   cd Smart-Budget/Smart-Budget
   ```
2. Install dependencies:
   ```sh
   pip install -r requirement.txt
   ```
3. Run the app:
   ```sh
   python app.py
   ```
4. Open [http://127.0.0.1:5000](http://127.0.0.1:5000) in your browser.

## Tech Stack
- Python 3
- Flask
- pandas
- Chart.js
- HTML/CSS/JS

## Demo
<!-- Optionally add a screenshot or GIF here -->

## About
Smart Budget — A Personal Finance Tracker with AI Insights

Everyone dreams of being financially free. It’s like that moment when you breathe out after holding your breath too long. But, man, keeping track of where all your money goes every month? It’s like chasing loose papers in the wind. You try to grab one, and another flies off. That’s why I want to build SmartBudget, a simple but smart personal finance tracker that doesn’t just show numbers, it talks to you. Like a friend who actually gets your spending habits and helps you make smarter choices. Not a boring budgeting app, more like a personal money coach, powered by AI, but with a little heart.
You know, as I’m studying Finance and Information Systems, with this small obsession for Fintech, I’ve always been curious how money and tech can work together to make life easier. During my internship, I worked with financial data, budgets, Excel dashboards all that serious stuff. But what hit me most was seeing how hard it is for people to keep track of what they earn versus what they spend. You blink, and half your paycheck’s gone. That’s where SmartBudget comes in. It combines everything I’ve learned so far, financial analysis, automation, and AI, into one friendly app that actually makes sense.
Who’s it for? Anyone who’s ever looked at their bank balance and said, “Wait, where did it all go?” So yeah, college students, young professionals, even families trying to stretch their income. People don’t always realize how small habits stack up: that morning coffee, Uber rides, late-night takeout, they sneak up like dust piling on furniture. SmartBudget would read data from bank statements, receipts, or even manual inputs, then break it down and talk to you about it, simply.
Picture this: you open the app on a random Tuesday and it says,
“You’ve spent 22% less on coffee this month — nice job!” or maybe,
“Your grocery costs are climbing, wanna check out cheaper stores near you?”
It will feel like the app’s rooting for you, not judging you. It would automatically categorize expenses, summarize your month, and even predict how much you might spend next month based on patterns. It could also create realistic saving goals that change with you, like a friend saying, “Hey, maybe save a little less this month since rent went up.”

The engine behind it all would be Python, with libraries like pandas, matplotlib, and scikit-learn, the brains for data and AI. For looks and feel, maybe Flask or Streamlit for the interface. Clean, fast, not too techy. And here’s something cool, a tiny chatbot inside. You could literally ask, “How much can I save if I stop eating out twice a week?” and boom, it replies, “About $85 a month, maybe put that toward your trip fund?”
There are already a few apps doing bits of this, but I want mine to feel more… human. Like, personal. Not just “budget this, save that.” One open-source project that really inspired me is this one:
URL:https://github.com/notCienki/Personal-Budget-Assistant , https://github.com/EnhancedJax/Bagels
Still, SmartBudget would go further. It wouldn’t just track money, it would understand why you spend the way you do. If you splurge a bit one week, instead of scolding you, it might say,
“Looks like you treated yourself,  nothing wrong with that! Want to balance it out next week?”
It’s friendly. It’s gentle. It gets you. Because money shouldn’t make you feel guilty — it should make you feel in control. 
Realistically, this project can be done by one person (me), but I’d honestly like to work with two. One could handle front-end, one the AI logic, and together it’d shine more.
Money can be messy, confusing, and sometimes even scary. But SmartBudget would make it feel simple, maybe even fun. It’s not just about tracking every penny; it’s about knowing your story through your spending. And maybe, just maybe, finally feeling like you’ve got your wallet and your life together again.

## License
MIT License
