import React, { useEffect, useMemo, useState } from 'react';
const seedTasks=[
 {id:1,title:'Review weekly priorities',category:'Work',due:'Today',done:true},
 {id:2,title:'Finish React practice',category:'Learning',due:'Today',done:false},
 {id:3,title:'Take a 20-minute walk',category:'Wellness',due:'Today',done:false},
 {id:4,title:'Plan tomorrow morning',category:'Personal',due:'Tomorrow',done:false}
];
const seedHabits=[
 {id:1,title:'Drink enough water',detail:'8 glasses',done:true,icon:'💧'},
 {id:2,title:'Read for 15 minutes',detail:'One small chapter',done:false,icon:'📚'},
 {id:3,title:'Move your body',detail:'A little movement counts',done:true,icon:'🏃'}
];
function load(key,fallback){try{const v=localStorage.getItem(key);return v?JSON.parse(v):fallback}catch{return fallback}}
export default function App(){
 const [tasks,setTasks]=useState(()=>load('pulseplan-tasks',seedTasks));
 const [habits,setHabits]=useState(()=>load('pulseplan-habits',seedHabits));
 const [filter,setFilter]=useState('All'),[query,setQuery]=useState(''),[newTask,setNewTask]=useState('');
 const [category,setCategory]=useState('Work'),[showForm,setShowForm]=useState(false),[notice,setNotice]=useState('');
 useEffect(()=>localStorage.setItem('pulseplan-tasks',JSON.stringify(tasks)),[tasks]);
 useEffect(()=>localStorage.setItem('pulseplan-habits',JSON.stringify(habits)),[habits]);
 const today=new Date().toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'});
 const done=tasks.filter(t=>t.done).length,progress=tasks.length?Math.round(done/tasks.length*100):0;
 const visible=useMemo(()=>tasks.filter(t=>(filter==='All'||(filter==='Completed'?t.done:!t.done))&&t.title.toLowerCase().includes(query.toLowerCase())),[tasks,filter,query]);
 function toast(s){setNotice(s);window.setTimeout(()=>setNotice(''),2400)}
 function addTask(e){e.preventDefault();if(!newTask.trim())return;setTasks(ts=>[{id:Date.now(),title:newTask.trim(),category,due:'Today',done:false},...ts]);setNewTask('');setShowForm(false);toast('Task added to your plan.')}
 function reset(){setTasks(seedTasks);setHabits(seedHabits);setFilter('All');setQuery('');toast('Sample planner restored.')}
 return <div className="app-shell">
  <aside className="sidebar">
   <a className="brand" href="#overview"><span className="brand-mark">✳</span><span>pulse<span className="brand-light">plan</span></span></a>
   <div className="workspace-label">WORKSPACE</div>
   <nav className="nav-list" aria-label="Main navigation"><a className="nav-item active" href="#overview"><span>▦</span> Overview</a><a className="nav-item" href="#tasks"><span>☷</span> My tasks <span className="nav-count">{tasks.filter(t=>!t.done).length}</span></a><a className="nav-item" href="#habits"><span>◷</span> Daily habits</a></nav>
   <div className="sidebar-bottom"><div className="focus-card"><div className="focus-icon">✦</div><p className="focus-title">Small steps, big change.</p><p className="focus-copy">Progress is built one day at a time. Keep showing up.</p></div><div className="profile"><div className="avatar">P</div><div><div className="profile-name">Personal space</div><div className="profile-sub">Free plan</div></div><span className="profile-dots">•••</span></div></div>
  </aside>
  <main className="main-content" id="overview">
   <header className="topbar"><div className="breadcrumb">Workspace <span>/</span> <strong>Overview</strong></div><div className="top-actions"><span className="today-pill">◷ &nbsp; {today}</span><div className="top-avatar">P</div></div></header>
   <section className="welcome-row"><div><div className="eyebrow"><span className="eyebrow-dot"></span> YOUR PERSONAL SPACE</div><h1>Make today <span>count.</span></h1><p className="welcome-sub">A little progress each day adds up to big results.</p></div><button className="primary-button" onClick={()=>setShowForm(v=>!v)}><span>＋</span> Add a task</button></section>
   {notice&&<div className="notice" role="status">{notice}</div>}
   <section className="stats-grid" aria-label="Task summary">
    <article className="stat-card"><div className="stat-top"><span className="stat-label">Total tasks</span><span className="stat-icon purple">☷</span></div><div className="stat-number">{tasks.length}<span className="stat-unit"> tasks</span></div><div className="stat-foot">Everything on your list</div></article>
    <article className="stat-card"><div className="stat-top"><span className="stat-label">Completed</span><span className="stat-icon green">✓</span></div><div className="stat-number">{done}<span className="stat-unit"> tasks</span></div><div className="mini-progress"><span style={{width:`${progress}%`}}></span></div><div className="stat-foot">{progress}% of your tasks complete</div></article>
    <article className="stat-card"><div className="stat-top"><span className="stat-label">Habits done</span><span className="stat-icon orange">✧</span></div><div className="stat-number">{habits.filter(h=>h.done).length}<span className="stat-unit"> / {habits.length}</span></div><div className="stat-foot">Keep your daily streak going</div></article>
   </section>
   <section className="content-grid">
    <article className="panel tasks-panel" id="tasks"><div className="panel-heading"><div><h2>My tasks</h2><p>Keep your priorities moving forward.</p></div><button className="text-button" onClick={()=>setShowForm(v=>!v)}>{showForm?'Cancel':'+ New task'}</button></div>
     {showForm&&<form className="task-form" onSubmit={addTask}><label htmlFor="task-title">Task name</label><input id="task-title" value={newTask} onChange={e=>setNewTask(e.target.value)} placeholder="What do you need to do?" autoFocus maxLength={100}/><div className="form-bottom"><select aria-label="Task category" value={category} onChange={e=>setCategory(e.target.value)}><option>Work</option><option>Learning</option><option>Wellness</option><option>Personal</option></select><button className="primary-button small" type="submit">Save task</button></div></form>}
     <div className="task-tools"><div className="filter-tabs" role="group" aria-label="Filter tasks">{['All','Active','Completed'].map(x=><button key={x} className={filter===x?'filter-tab selected':'filter-tab'} onClick={()=>setFilter(x)}>{x}</button>)}</div><label className="search-box"><span>⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search tasks" aria-label="Search tasks"/></label></div>
     <div className="task-list">{visible.map(t=><div className={`task-row ${t.done?'task-done':''}`} key={t.id}><button className={`task-check ${t.done?'checked':''}`} onClick={()=>setTasks(ts=>ts.map(x=>x.id===t.id?{...x,done:!x.done}:x))} aria-label={t.done?`Mark ${t.title} incomplete`:`Complete ${t.title}`}>{t.done?'✓':''}</button><div className="task-info"><div className="task-title">{t.title}</div><div className="task-meta"><span className={`category-dot ${t.category.toLowerCase()}`}></span>{t.category}<span className="meta-separator">·</span>{t.due}</div></div><button className="delete-task" onClick={()=>setTasks(ts=>ts.filter(x=>x.id!==t.id))} aria-label={`Delete ${t.title}`} title="Delete task">×</button></div>)}{visible.length===0&&<div className="empty-state"><span>☷</span><strong>No tasks found</strong><p>Try another search or add a new task.</p></div>}</div>
     <div className="panel-footer"><span>Showing {visible.length} of {tasks.length} tasks</span><button onClick={reset}>Reset sample data</button></div>
    </article>
    <div className="right-column">
     <article className="panel habits-panel" id="habits"><div className="panel-heading"><div><h2>Daily habits</h2><p>Consistency over perfection.</p></div><span className="habit-count">{habits.filter(h=>h.done).length}/{habits.length}</span></div><div className="habit-list">{habits.map(h=><div className="habit-row" key={h.id}><div className="habit-emoji">{h.icon}</div><div className="habit-info"><div className="habit-title">{h.title}</div><div className="habit-detail">{h.detail}</div></div><button className={`habit-toggle ${h.done?'habit-on':''}`} onClick={()=>setHabits(hs=>hs.map(x=>x.id===h.id?{...x,done:!x.done}:x))} aria-label={`${h.done?'Uncheck':'Complete'} ${h.title}`}>{h.done?'✓':''}</button></div>)}</div><div className="habit-message"><span>✦</span> You don't have to be perfect. Just keep going.</div></article>
     <article className="quote-panel"><div className="quote-mark">“</div><p>It always seems impossible until it's done.</p><div className="quote-author"><span></span> A reminder for today</div></article>
     <article className="tip-panel"><div className="tip-icon">☀</div><div><strong>One thing at a time</strong><p>Choose your next small step and give it your attention.</p></div></article>
    </div>
   </section>
   <footer className="page-footer"><span>✳ pulseplan</span><span>Made for your everyday progress.</span></footer>
  </main>
 </div>
}