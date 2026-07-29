# CT USAG Website — How to Edit Your Site

Welcome! This guide shows you how to update your website using CloudCannon. No coding required.

---

## Logging In

1. Go to **app.cloudcannon.com**
2. Sign in with your account
3. Click **Sites** → click **ctusagym**

You're now on your site dashboard.

---

## Editing Content (Calendar, Clubs, Fees, etc.)

All your site content lives in data files. Here's how to edit them:

1. In the left sidebar, click **File Browser** (near the bottom)
2. Click **src**
3. Click **_data**
4. Click the file you want to edit:

| File | What It Controls |
|---|---|
| `calendar.json` | Season calendar (all meets) |
| `clubs.json` | Clubs directory |
| `announcements.json` | Homepage announcements |
| `state_meets.json` | State meet details (fees, sessions, deadlines) |
| `judges_committee.json` | Judges committee member list |
| `fees.json` | Entry fee schedule |
| `qualification_scores.json` | Qualification score requirements |
| `photos.json` | Homepage photo carousel |
| `site.json` | Site settings (chairman name, email, copyright year) |
| `navigation.json` | Navigation menu links |

5. The file opens in code view. **Switch to the visual editor** by clicking the icon to the LEFT of the `<>` button (top-right area)
6. You'll see a list of entries you can expand, edit, and rearrange
7. Click **Save** (top-right) when done

---

## Common Tasks

### Add a New Meet to the Calendar

1. File Browser → src → _data → `calendar.json`
2. Switch to visual editor
3. Click **+ Add** at the top
4. Fill in the fields:
   - **Event Name** — e.g., "Spring Classic"
   - **Status** — sanctioned or pending
   - **Start Date** — pick from calendar
   - **End Date** — pick from calendar
   - **Host** — e.g., "Glastonbury Gym Club"
   - **State** — e.g., "CT"
   - **Location** — full address
5. Click **Save**

### Remove a Meet from the Calendar

1. File Browser → src → _data → `calendar.json`
2. Switch to visual editor
3. Find the meet you want to remove
4. Click the **trash icon** next to it
5. Click **Save**

### Update a Club's Contact Info

1. File Browser → src → _data → `clubs.json`
2. Switch to visual editor
3. Find the club
4. Update the phone, email, website, or address
5. Click **Save**

### Change the State Chairman

1. File Browser → src → _data → `site.json`
2. Switch to visual editor
3. Update **State Chairman Name** and **State Chairman Email**
4. Click **Save**

### Add a New Announcement

1. File Browser → src → _data → `announcements.json`
2. Switch to visual editor
3. Click **+ Add**
4. Fill in: Date Label, Category, Title, Description, Link (optional)
5. Click **Save**

### Update Entry Fees

1. File Browser → src → _data → `fees.json`
2. Switch to visual editor
3. Find the level you want to change
4. Update the amounts
5. Click **Save**

### Add or Update a Homepage Photo

1. File Browser → src → _data → `photos.json`
2. Switch to visual editor
3. Click **+ Add** for a new photo, or click an existing one to edit
4. Upload the image, set the alt text and caption
5. Click **Save**

---

## Seeing Your Changes

After you click Save, CloudCannon automatically rebuilds your site. This takes about 30-60 seconds.

To see the updated site:
- Click the link at the top-right of the dashboard: **doted-volcano.cloudvent.net**
- Or go to your custom domain once it's connected

---

## Important Notes

- **You cannot break the site** by editing data files. The layout and design stay the same no matter what you type in the fields.
- **Every change is saved to history.** If something goes wrong, you can undo it.
- **Don't edit files outside the `_data` folder** unless you know what you're doing.
- If you need help, contact Rich.

---

That's it. Open the file, edit the fields, click Save. Your site updates automatically.
