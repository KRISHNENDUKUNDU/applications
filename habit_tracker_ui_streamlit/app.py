import streamlit as st
import pandas as pd
import numpy as np
import plotly.graph_objects as go

# --- PAGE CONFIGURATION ---
st.set_page_config(page_title="Habit Tracker", layout="wide", initial_sidebar_state="expanded")

# --- MOCK DATA GENERATION ---
days_in_month = 31
habits = [
    "Attend classes on time", "Wake up before 7 AM", "Drink 2L of water",
    "Study 2 hours", "Complete assignments", "Revise notes",
    "No Instagram scrolling", "Read 10 pages", "Exercise / Walk", "Save $5"
]

# Generate random boolean data for the habit grid
np.random.seed(42)
habit_data = np.random.choice([True, False], size=(len(habits), days_in_month), p=[0.6, 0.4])
df_habits = pd.DataFrame(habit_data, columns=[str(i) for i in range(1, days_in_month + 1)])
df_habits.insert(0, "Habit", habits)

# Calculate mock progress metrics
df_habits["Completed"] = df_habits.iloc[:, 1:].sum(axis=1)
df_habits["Left"] = days_in_month - df_habits["Completed"]
df_habits["Progress (%)"] = (df_habits["Completed"] / days_in_month) * 100

# --- SIDEBAR ---
with st.sidebar:
    st.title("🎯 Habit Tracker")
    st.markdown("---")
    st.radio("Navigation", ["Dashboard", "Calendar", "Habits", "Analytics", "Settings"], label_visibility="collapsed")
    st.markdown("---")
    
    # Monthly Progress Donut Chart
    st.markdown("### Monthly Progress")
    fig_donut = go.Figure(data=[go.Pie(
        labels=['Completed', 'Left'], 
        values=[383, 231], 
        hole=.7,
        marker_colors=['#2ecc71', '#f0f2f6'],
        textinfo='none'
    )])
    fig_donut.update_layout(
        showlegend=False, 
        margin=dict(t=0, b=0, l=0, r=0), 
        height=150,
        annotations=[dict(text='62%', x=0.5, y=0.5, font_size=20, showarrow=False)]
    )
    st.plotly_chart(fig_donut, use_container_width=True)
    
    col1, col2, col3 = st.columns(3)
    col1.metric("Completed", "383")
    col2.metric("Goal", "614")
    col3.metric("Left", "231")
    
    st.info("⭐ **Keep it up!**\n\nConsistency is the key to building great habits.")

# --- MAIN CONTENT ---
# Header
header_col1, header_col2, header_col3 = st.columns([3, 1, 1])
with header_col1:
    st.header("DAILY HABIT TRACKER")
    st.caption("Track your habits. Build your future.")
with header_col2:
    st.selectbox("Year", ["2025", "2024", "2023"], label_visibility="collapsed")
with header_col3:
    st.selectbox("Month", ["October", "November", "December"], label_visibility="collapsed")

st.markdown("---")

# Overview Section
st.subheader("OVERVIEW")
overview_col1, overview_col2 = st.columns([3, 1])

with overview_col1:
    # Mock Bar Chart for Weekly Overview
    weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5']
    completed = [31, 33, 40, 37, 5]
    goals = [77, 77, 77, 77, 33]
    
    fig_bar = go.Figure()
    # Adding multiple bars to simulate the varying heights in the image per week
    for i, week in enumerate(weeks):
        colors = ['#a29bfe', '#74b9ff', '#ff7675', '#55efc4', '#ffeaa7']
        y_vals = np.random.randint(2, 10, size=7) if i < 4 else np.random.randint(2, 10, size=3)
        x_vals = [f"{week} - Day {j+1}" for j in range(len(y_vals))]
        fig_bar.add_trace(go.Bar(x=x_vals, y=y_vals, marker_color=colors[i], name=week))
        
    fig_bar.update_layout(
        barmode='group', 
        height=250, 
        margin=dict(t=10, b=10, l=10, r=10),
        xaxis=dict(showticklabels=False), # Hide individual day labels for cleaner look
        showlegend=True,
        legend=dict(orientation="h", yanchor="bottom", y=1.02, xanchor="right", x=1)
    )
    st.plotly_chart(fig_bar, use_container_width=True)

with overview_col2:
    st.markdown("#### TOP 10 DAILY HABITS")
    for i, habit in enumerate(habits):
        st.markdown(f"**{i+1}.** {habit}")

st.markdown("---")

# Daily Habits Checkbox Grid & Progress Section
st.subheader("DAILY HABITS")

# We use st.data_editor to create the interactive checkbox grid
# We format the 'Progress (%)' column to actually render as a progress bar
st.data_editor(
    df_habits,
    hide_index=True,
    use_container_width=True,
    disabled=["Habit", "Completed", "Left", "Progress (%)"], # Prevent editing the summary columns
    column_config={
        "Habit": st.column_config.TextColumn("Habit", width="medium"),
        "Completed": st.column_config.NumberColumn("Completed", width="small"),
        "Left": st.column_config.NumberColumn("Left", width="small"),
        "Progress (%)": st.column_config.ProgressColumn(
            "Progress",
            format="%d%%",
            min_value=0,
            max_value=100,
        ),
    }
)