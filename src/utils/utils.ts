export const formatBusinessTypes = (input: string | string[]): string => {
    // Обрабатываем случай, когда входной параметр - массив
    if (Array.isArray(input)) {
      return input.map(item => formatSingleItem(item)).join(', ');
    }
    
    // Обрабатываем случай, когда входной параметр - строка
    return formatSingleItem(input);
}

const formatSingleItem = (item: string): string => {
    return item.split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
}

export const formatDate = (inputDate: string): string => {
    // Создаем объект Date из входной строки
    const date = new Date(inputDate);
    
    // Проверяем валидность даты
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date format');
    }
    
    // Получаем компоненты даты
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
    const year = date.getFullYear();
    
    // Форматируем в нужный вид
    return `${month}.${day}.${year}`;
}
  