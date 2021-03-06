const ru: {} = {
    title: 'Fast!CV - Простой и быстрый конструктор резюме!',
    meta: {
        author: 'Артём Анпилов',
        copyright: 'Проект Артёма Анпилова',
        description: 'Fast!CV это инструмент для создания простого резюме, содержащего только самую важную информацию для потенциального работодателя!',
        keywords: 'резюме, конструктор, генератор, просто, быстро, онлайн, бесплатно, без регистрации, pdf, создать'
    },
    buttons: {
        menu: 'Меню',
        generate: 'Сгенерировать',
        addNew: '+ Добавить',
        download: 'Скачать',
        apply: 'Применить',
        uploadPhoto: 'Загрузить фото',
        uploadJSON: 'Загрузить JSON',
        delete: 'Удалить',
        build: 'Создай своё резюме!'
    },
    selects: {
        maritalStatus: ['В браке', 'Холост', 'В разводе']
    },
    checkboxes: {
        currentWork: 'Текущее место работы'
    },
    radios: {
        themes: ['Простая', 'Первая', 'Вторая', 'Третья', 'Четвертая', 'Пятая']
    },
    fields: {
        name: 'ФИО',
        address: 'Адрес',
        phone: 'Номер телефона',
        maritalStatus: 'Семейный статус',
        dateOfBirth: 'Дата рождения',
        email: 'Email',
        site: 'Сайт/страница',
        objective: 'Ваша цель',
        aboutObjective: 'Опишите ваши преимущества на этой должности',
        qualities: 'Напишите о ваших личных качествах',
        skills: 'Напишите о ваших навыках',
        period: 'Период',
        university: 'Образовательное учереждение',
        degree: 'Степень',
        company: 'Компания',
        from: 'С',
        to: 'До',
        country: 'Страна',
        city: 'Город',
        position: 'Должность',
        duties: 'Рабочие обязанности и достижения',
        uploadFile: ['Допустимые форматы', 'Максимальный размер файла']
    },
    infoBlocks: {
        personal: 'Персональная информация',
        objective: 'Цель',
        education: 'Образование',
        work: 'Опыт работы',
        qualities: 'Личные качества',
        skills: 'Навыки'
    },
    helper: {
        overflow: 'Ошибка! Отредактируйте резюме таким образом, чтобы вся информация поместилась на&nbsp;1&nbsp;странице.',
        objective: 'В&nbsp;этом пункте необходимо указать цель резюме&nbsp;&mdash; соискание должности, на&nbsp;которую вы&nbsp;претендуете. При этом можно не&nbsp;просто написать, какая должность вас интересует, но&nbsp;и&nbsp;кратко обосновать, почему именно вы&nbsp;должны занять&nbsp;ее, какие качества помогут вам успешно реализовать себя на&nbsp;этом месте.',
        qualities: 'С&nbsp;этим разделом резюме, казалось&nbsp;бы, справиться проще всего, но&nbsp;на&nbsp;деле вам нужно будет найти баланс между хвалебной одой самому себе и&nbsp;излишней скромностью. Наш совет: постарайтесь поставить себя на&nbsp;место работодателя и&nbsp;подумать, какими качествами должен обладать кандидат на&nbsp;эту должность.',
        skills: 'Именно в&nbsp;этом разделе у&nbsp;вас есть возможность раскрыться и&nbsp;показать себя с&nbsp;лучшей стороны благодаря дополнительным навыкам.'
    },
    error: {
        fileSize: 'Не допустимый размер файла!',
        fileFormat: 'Формат файла не верный!'
    },
    descriptions: {
        uploadJSON: 'Вы можете загрузить ранее скачанный файл *.json с данными резюме',
        downloadJSON: 'На ваш компьютер будет скачан файл формата *.json с данными (кроме фото), введенными вами в резюме'
    },
    constructor: {
        aside: {
            tabs: {
                cv: 'Резюме',
                options: 'Опции'
            },
            options: {
                theme: 'Выбор темы',
                colors: 'Выбор цветов',
                download: 'Скачать данные в формате JSON',
                upload: 'Загрузить JSON с данными'
            },
            placeholders: {
                name: 'Ваше имя'
            }
        },
        preview: {
            theme: 'Тема',
            title: 'Предпросмотр'
        }
    },
    mainpage: {
        share: 'Расскажи о нас :)',
        title: 'Fast!CV - Простой и быстрый способ создать своё резюме!',
        text: 'Fast!CV это инструмент для создания простого резюме, содержащего только самую важную информацию для потенциального работодателя!'
    },
    footer: {
        name: 'Fast!CV',
        version: 'v.1.0',
        created: 'Создано'
    }
}

export default ru
