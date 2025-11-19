# Bootstrap Accordion aur Collapse Examples (ng-bootstrap ke saath)

## ✅ Setup Complete!
Ab aapke project mein `ng-bootstrap` install ho chuki hai. Aap niche diye gaye examples ko kisi bhi component HTML mein use kar sakte hain.

---

## 📚 Example 1: Accordion (Multiple Items)

```html
<!-- Accordion Example -->
<ngb-accordion>
  <ngb-panel title="First Panel">
    <ng-template ngbPanelContent>
      Yeh first panel ka content hai. Click karein collapse karne ke liye.
    </ng-template>
  </ngb-panel>
  
  <ngb-panel title="Second Panel">
    <ng-template ngbPanelContent>
      Yeh second panel ka content hai. Automatically pehla close ho jayega.
    </ng-template>
  </ngb-panel>
  
  <ngb-panel title="Third Panel">
    <ng-template ngbPanelContent>
      Yeh third panel ka content hai. Accordion smoothly kaam karega!
    </ng-template>
  </ngb-panel>
</ngb-accordion>
```

### Multiple Panels Ek Saath Open Karein:
```html
<ngb-accordion [closeOthers]="false">
  <ngb-panel title="First">
    <ng-template ngbPanelContent>
      Content 1
    </ng-template>
  </ngb-panel>
  
  <ngb-panel title="Second">
    <ng-template ngbPanelContent>
      Content 2
    </ng-template>
  </ngb-panel>
</ngb-accordion>
```

---

## 📦 Example 2: Simple Collapse (Show/Hide Content)

### HTML:
```html
<button class="btn btn-primary" (click)="isCollapsed = !isCollapsed" 
        [attr.aria-expanded]="!isCollapsed">
  {{ isCollapsed ? 'Content Dikhayen' : 'Content Chhupayen' }}
</button>

<div [ngbCollapse]="isCollapsed" class="mt-3">
  <div class="card card-body">
    Yeh collapsed content hai! Button click karne par show/hide hoga.
  </div>
</div>
```

### TypeScript (Component file mein):
```typescript
export class YourComponent {
  isCollapsed = true;
}
```

---

## 🎯 Example 3: Multiple Collapse Items

### HTML:
```html
<div class="mb-3">
  <button class="btn btn-outline-primary me-2" 
          (click)="collapseOne = !collapseOne">
    Toggle First
  </button>
  <button class="btn btn-outline-secondary" 
          (click)="collapseTwo = !collapseTwo">
    Toggle Second
  </button>
</div>

<div [ngbCollapse]="collapseOne" class="mb-2">
  <div class="alert alert-info">
    First collapse content yahaan hai!
  </div>
</div>

<div [ngbCollapse]="collapseTwo">
  <div class="alert alert-warning">
    Second collapse content yahaan hai!
  </div>
</div>
```

### TypeScript:
```typescript
export class YourComponent {
  collapseOne = true;
  collapseTwo = true;
}
```

---

## 🌟 Example 4: Accordion with Custom Styling

```html
<ngb-accordion #accordion="ngbAccordion" class="custom-accordion">
  <ngb-panel id="panel-1">
    <ng-template ngbPanelTitle>
      <span class="fw-bold">📋 User Information</span>
    </ng-template>
    <ng-template ngbPanelContent>
      <ul>
        <li>Name: John Doe</li>
        <li>Email: john@example.com</li>
        <li>Role: Admin</li>
      </ul>
    </ng-template>
  </ngb-panel>

  <ngb-panel id="panel-2">
    <ng-template ngbPanelTitle>
      <span class="fw-bold">⚙️ Settings</span>
    </ng-template>
    <ng-template ngbPanelContent>
      <p>Settings options yahaan display honge.</p>
    </ng-template>
  </ngb-panel>

  <ngb-panel id="panel-3">
    <ng-template ngbPanelTitle>
      <span class="fw-bold">📊 Reports</span>
    </ng-template>
    <ng-template ngbPanelContent>
      <p>Reports section yahaan hoga.</p>
    </ng-template>
  </ngb-panel>
</ngb-accordion>
```

---

## 🎨 Example 5: Programmatically Control Collapse

### HTML:
```html
<div class="mb-3">
  <button class="btn btn-success me-2" (click)="openCollapse()">
    Open
  </button>
  <button class="btn btn-danger" (click)="closeCollapse()">
    Close
  </button>
</div>

<div [ngbCollapse]="isContentCollapsed">
  <div class="card card-body bg-light">
    Yeh content buttons se control ho raha hai!
  </div>
</div>
```

### TypeScript:
```typescript
export class YourComponent {
  isContentCollapsed = true;

  openCollapse() {
    this.isContentCollapsed = false;
  }

  closeCollapse() {
    this.isContentCollapsed = true;
  }
}
```

---

## 🔧 Important Notes:

1. **NgbModule Import karna zaroori hai** - Already aapke `app.module.ts` mein add ho chuka hai
2. **Bootstrap CSS zaroori hai** - Already aapke `angular.json` mein configured hai
3. **Bootstrap JavaScript bundle REMOVE kar diya gaya hai** - ng-bootstrap handle karega

---

## ⚠️ Common Issues & Solutions:

### Issue: Accordion/Collapse kaam nahi kar raha
**Solution:** 
- Check karein `NgbModule` import hai ya nahi `app.module.ts` mein
- Development server restart karein: `ng serve`

### Issue: Styling theek nahi lag rahi
**Solution:**
- Bootstrap CSS properly import hai ya nahi check karein
- Browser cache clear karein

### Issue: Animation smooth nahi hai
**Solution:**
- `BrowserAnimationsModule` import hai (already hai aapke project mein)

---

## 🚀 Quick Start Command:
```bash
ng serve
```

Server restart karne ke baad sab kuch properly kaam karega! 🎉
