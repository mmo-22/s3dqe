# موقع حسابات سعد الرسمية

موقع ويب احترافي لعرض حسابات التواصل الاجتماعي مع دعم إعلانات جوجل آدسنس.

## المميزات

✅ **تصميم عربي متجاوب** - يدعم جميع الأجهزة والشاشات  
✅ **مساحات إعلانية لجوجل آدسنس** - مواضع استراتيجية للإعلانات  
✅ **عرض حسابات التواصل الاجتماعي** - 6 منصات مختلفة  
✅ **تفاعل ديناميكي** - أنيميشن وتأثيرات حديثة  
✅ **سرعة تحميل عالية** - مُحسّن للأداء  
✅ **متوافق مع SEO** - محسّن لمحركات البحث  

## إعداد إعلانات جوجل آدسنس

### 1. الحصول على حساب آدسنس
- سجّل في [Google AdSense](https://www.google.com/adsense/)
- احصل على Publisher ID الخاص بك

### 2. تحديث معرف الناشر
في ملف `index.html`، استبدل `YOUR_PUBLISHER_ID` بمعرفك الحقيقي:

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID"
        crossorigin="anonymous"></script>
```

### 3. إنشاء وحدات إعلانية
- اذهب إلى لوحة تحكم آدسنس
- أنشئ وحدات إعلانية جديدة
- احصل على Ad Slot IDs

### 4. تحديث معرفات الإعلانات
استبدل `YOUR_AD_SLOT_ID` و `YOUR_AD_SLOT_ID_2` بالمعرفات الحقيقية:

```html
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
     data-ad-slot="YOUR_AD_SLOT_ID"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
```

## تخصيص المحتوى

### تحديث معلومات الحسابات
في `index.html`، قم بتحديث:
- أسماء المستخدمين
- روابط الحسابات  
- عدد المتابعين
- معلومات التواصل

### تغيير الألوان والتصميم
في `styles.css`، يمكنك تخصيص:
- الألوان الأساسية
- الخطوط
- التباعد والأحجام

## هيكل الملفات

```
├── index.html          # الصفحة الرئيسية
├── styles.css          # ملف التصميم
├── script.js           # ملف JavaScript
└── README.md           # هذا الملف
```

## الأقسام الرئيسية

1. **الهيدر** - شعار الموقع والقائمة
2. **البانر الرئيسي** - رسالة ترحيب
3. **الإعلانات** - مساحة للإعلانات
4. **الحسابات** - عرض حسابات التواصل الاجتماعي
5. **حول** - معلومات شخصية وإحصائيات
6. **تواصل** - معلومات الاتصال
7. **الفوتر** - روابط إضافية

## التحسينات المتقدمة

### إضافة Google Analytics
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### تحسين السرعة
- ضغط الصور
- تفعيل التخزين المؤقت
- استخدام CDN

### تحسين محركات البحث
```html
<meta name="description" content="الصفحة الرسمية لحسابات سعد على جميع منصات التواصل الاجتماعي">
<meta name="keywords" content="سعد, حسابات رسمية, تواصل اجتماعي">
<meta property="og:title" content="حسابات سعد الرسمية">
<meta property="og:description" content="تابع سعد على جميع منصات التواصل الاجتماعي">
```

## النشر والرفع

### استضافة مجانية
- [Netlify](https://netlify.com)
- [Vercel](https://vercel.com)  
- [GitHub Pages](https://pages.github.com)

### استضافة مدفوعة
- [Hostinger](https://hostinger.com)
- [SiteGround](https://siteground.com)

## الدعم الفني

للحصول على المساعدة:
1. راجع وثائق Google AdSense
2. تحقق من أدوات المطور في المتصفح
3. اختبر الموقع على أجهزة مختلفة

## رخصة الاستخدام

هذا المشروع مفتوح المصدر ويمكن استخدامه وتعديله بحرية.

---

**ملاحظة مهمة**: تأكد من اتباع سياسات Google AdSense لتجنب إيقاف حسابك. 