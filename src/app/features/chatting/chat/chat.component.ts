// chat.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  activeTab: 'chat' | 'new' = 'chat';
  activeChat: any = null;



  chats = [
    {
      id: 1,
      name: 'Sarah Kortney',
      message: 'Nullam facilisis velit',
      time: '10:00pm',
      unread: false,
      online: true,
      profilePic: '/assets/j.jpg',
      lastSeen: 'Last Seen 10:36pm ago'
    },
    {
      id: 2,
      name: 'Tommy Nash',
      message: 'Nullam facilisis velit',
      time: '10:00pm',
      unread: false,
      online: true,
      profilePic: '/assets/7.jpg',
      lastSeen: 'Last Seen 10:36pm ago'
    },
    {
      id: 3,
      name: 'Kathryn Mengel',
      message: 'Nullam facilisis velit',
      time: '10:00pm',
      unread: false,
      online: false,
      profilePic: '/assets/q.avif',
      lastSeen: 'Last Seen 10:36pm ago'
    },
    {
      id: 4,
      name: 'Mayra Sibley',
      message: 'Nullam facilisis velit',
      time: '10:00pm',
      unread: false,
      online: true,
      profilePic: '/assets/w.avif',
      lastSeen: 'Last Seen 10:36pm ago'
    },
    {
      id: 5,
      name: 'Theron Trump',
      message: 'Nullam facilisis velit',
      time: '10:00pm',
      unread: false,
      online: false,
      profilePic: '/assets/m.avif',
      lastSeen: 'Last Seen 10:36pm ago'
    },
    {
      id: 6,
      name: 'Mical',
      message: 'Nullam facilisis velit.',
      time: '10:00pm',
      unread: false,
      online: true,
      profilePic: '/assets/kl.png',
      lastSeen: 'Last Seen 10:36pm ago'
    },


    {
      id: 9,
      name: 'Mical Clark',
      message: 'Nullam facilisis velit',
      time: '10:00pm',
      unread: false,
      online: false,
      profilePic: '/assets/ok.png',
      lastSeen: 'Last Seen 10:36pm ago'
    },
    {
      id: 10,
      name: 'Colin Nathan',
      message: 'Nullam facilisis velit.',
      time: '10:00pm',
      unread: false,
      online: true,
      profilePic: '/assets/hj.png',
      lastSeen: 'Last Seen 10:36pm ago'
    },
    {
      id: 11,
      name: 'Nathan Johan',
      message: 'Nullam facilisis velit',
      time: '10:00pm',
      unread: false,
      online: true,
      profilePic: '/assets/ko.png',
      lastSeen: 'Last Seen 10:36pm ago'
    },
    {
      id: 12,
      name: 'Sami Doe',
      message: 'Nullam facilisis velit',
      time: '10:00pm',
      unread: false,
      online: false,
      profilePic: '/assets/ml.png',
      lastSeen: 'Last Seen 10:36pm ago'
    },

    {
      id: 14,
      name: 'Mimi Carreira',
      message: 'Nullam facilisis velit',
      time: '10:00pm',
      unread: false,
      online: false,
      profilePic: '/assets/nb (2).png',
      lastSeen: 'Last Seen 10:36pm ago'
    },
    {
      id: 15,
      name: 'John Doe',
      message: 'Nullam fociilis velit.',
      time: '10:00pm',
      unread: false,
      online: true,
      profilePic: '/assets/s.avif',
      lastSeen: 'Last Seen 10:36pm ago'
    }
  ];

  newChats = [
    {
      id: 16,
      name: 'Williernee Logasse',
      unread: true,
      online: true,
      profilePic: '/assets/q.avif',
      lastSeen: 'Last Seen 10:36pm ago'
    },
    {
      id: 12,
      name: 'Sami Doe',
      unread: false,
      online: true,
      profilePic: '/assets/ml.png',
      lastSeen: 'Last Seen 10:36pm ago'
    },

    {
      id: 14,
      name: 'Mimi Carreira',
      unread: false,
      online: true,
      profilePic: '/assets/nb (2).png',
      lastSeen: 'Last Seen 10:36pm ago'
    },
    {
      id: 15,
      name: 'John Doe',
      unread: false,
      online: true,
      profilePic: '/assets/s.avif',
      lastSeen: 'Last Seen 10:36pm ago'
    }
  ];

  chatMessages: { [key: number]: any[] } = {
    1: [
      { id: 1, sender: 'Sarah Kortney', message: 'What do you think about our plans for this product launch?', time: '09:28', isMe: false },
      { id: 2, sender: 'Sarah Kortney', message: 'It looks to me like you have a lot planned before your deadline. I would suggest you push your deadline back so you have time to run a successful advertising campaign.', time: '09:30', isMe: false },
      { id: 3, sender: 'Me', message: 'That makes sense. I was worried about the timeline too.', time: '09:32', isMe: true },
      { id: 4, sender: 'Sarah Kortney', message: 'Let me know if you need help with the advertising team. I can introduce you to some contacts.', time: '09:33', isMe: false },
      { id: 5, sender: 'Me', message: 'That would be great! Can you send me their details?', time: '09:35', isMe: true }
    ],
    14: [
      { id: 1, sender: 'Mimi Carreira', message: 'I would suggest you discuss this further with the advertising team.', time: '09:41', isMe: false },
      { id: 2, sender: 'Mimi Carreira', message: 'I am very busy at the moment and on top of everything, I forgot my umbrella today.', time: '09:42', isMe: false },
      { id: 3, sender: 'Me', message: 'No problem, we can reschedule. Hope you stay dry!', time: '09:45', isMe: true }
    ],
    6: [
      { id: 1, sender: 'Mical', message: 'Hey, are we still meeting tomorrow?', time: '10:00', isMe: false },
      { id: 2, sender: 'Me', message: 'Yes, 2 PM at the usual place.', time: '10:05', isMe: true }
    ],
    9: [
      { id: 1, sender: 'Mical Clark', message: 'Did you get the documents I sent?', time: '14:20', isMe: false },
      { id: 2, sender: 'Me', message: 'Not yet, can you resend?', time: '14:25', isMe: true },
      { id: 3, sender: 'Mical Clark', message: 'Sure, sending now.', time: '14:26', isMe: false }
    ],
    10: [
      { id: 1, sender: 'Colin Nathan', message: 'The project is going well so far.', time: '11:15', isMe: false },
      { id: 2, sender: 'Me', message: 'Great to hear! Any blockers?', time: '11:20', isMe: true }
    ],
    11: [
      { id: 1, sender: 'Nathan Johan', message: 'Meeting at 3 PM today.', time: '13:00', isMe: false },
      { id: 2, sender: 'Me', message: 'Confirmed, see you then.', time: '13:05', isMe: true }
    ],
    12: [
      { id: 1, sender: 'Sami Doe', message: 'Can you review my proposal?', time: '16:30', isMe: false },
      { id: 2, sender: 'Me', message: 'I will look at it first thing tomorrow.', time: '16:35', isMe: true }
    ]
  };
  currentDate: Date = new Date(2025, 10, 1);
  currentMonth: string = '';
  currentYear: number = 0;
  calendarDays: any[] = [];

  events = [
    { date: '8 March', title: 'Main basket bereama muhammad fauzi' },
    { date: '9 March', title: 'Decaline project desain aplikasi $5000' },
    { date: '10 March', title: 'Meeting iTone persiaipan lomba website di jogja dan ...' },
    { date: '8 June', title: 'Main basket bereama muhammad fauzi' },
    { date: '9 July', title: 'Decaline project desain aplikasi $5000' },
    { date: '10 Novemeber', title: 'Meeting iTone persiaipan lomba website di jogja dan ...' },
    { date: '11 Novemeber ', title: 'Been get to jeaja untuk technical meeting' }
  ];

  showDropdown = false;
  newMessage = '';

  constructor() {
    this.generateCalendar();
  }



  // Method to get initials from name
  getInitials(name: string): string {
    return name.split(' ').map(part => part[0]).join('').toUpperCase().substring(0, 2);
  }

  handleImageError(event: any, chat: any) {
    const element = event.target;
    element.style.display = 'none';

    const parent = element.parentElement;
    const initialsDiv = document.createElement('div');
    initialsDiv.className = 'avatar-initials';
    initialsDiv.textContent = this.getInitials(chat.name);

    const existingInitials = parent.querySelector('.avatar-initials');
    if (existingInitials) {
      existingInitials.remove();
    }
    parent.appendChild(initialsDiv);
  }

  handleImageLoad(event: any) {
    const element = event.target;
    const parent = element.parentElement;
    const initialsDiv = parent.querySelector('.avatar-initials');
    if (initialsDiv) {
      initialsDiv.remove();
    }
    element.style.display = 'block';
  }

  generateCalendar() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    this.currentMonth = this.currentDate.toLocaleString('default', { month: 'long' });
    this.currentYear = year;

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const prevMonthLastDay = new Date(year, month, 0).getDate();

    this.calendarDays = [];

    // Previous month days
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      this.calendarDays.push({
        day: prevMonthLastDay - i,
        currentMonth: false,
        events: []
      });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const events = [];
      if (day === 8) events.push({ color: 'red', time: '10:00' });
      if (day === 9) events.push({ color: 'green', time: '14:00' });
      if (day === 10) events.push({ color: 'red', time: '11:30' });
      if (day === 11) events.push({ color: 'green', time: '16:00' });

      this.calendarDays.push({
        day: day,
        currentMonth: true,
        events: events
      });
    }

    const totalCells = 42;
    const remainingDays = totalCells - this.calendarDays.length;
    for (let day = 1; day <= remainingDays; day++) {
      this.calendarDays.push({
        day: day,
        currentMonth: false,
        events: []
      });
    }
  }

  previousMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
    this.generateCalendar();
  }

  nextMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    this.generateCalendar();
  }

  switchTab(tab: 'chat' | 'new') {
    this.activeTab = tab;
    this.activeChat = null;
  }

  selectChat(chat: any) {
    this.activeChat = chat;
    const width = window.innerWidth;
    if (!this.chatMessages[chat.id]) {
      this.chatMessages[chat.id] = [];
    }
    
    if (width <= 760) {
      
      this.scrollToDiv()
    }
  }

  sendMessage() {
    if (this.newMessage.trim() && this.activeChat) {
      if (!this.chatMessages[this.activeChat.id]) {
        this.chatMessages[this.activeChat.id] = [];
      }

      this.chatMessages[this.activeChat.id].push({
        id: this.chatMessages[this.activeChat.id].length + 1,
        sender: 'Me',
        message: this.newMessage,
        time: 'Now',
        isMe: true
      });
      this.newMessage = '';
    }
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  getActiveMessages() {
    if (this.activeChat && this.chatMessages[this.activeChat.id]) {
      return this.chatMessages[this.activeChat.id];
    }
    return [];
  }


  getMyInitials(): string {
    return 'ME';
  }

  getInitialsForMessage(senderName: string): string {
    if (senderName === 'Me') {
      return this.getMyInitials();
    }
    return this.getInitials(senderName);
  }

  scrollToDiv() {
    const element = document.getElementById("targetSection");
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}