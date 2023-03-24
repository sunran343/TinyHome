import xlrd
import xlwt


def read_excel(file_name, sheet_name):
    """
    读取 excel
    :return: 返回数组，每个数组元素为excel的一行数据，用对应header做key
    """
    res_arr = []
    workbook = xlrd.open_workbook(file_name)
    # 可以使用workbook对象的sheet_names()方法获取到excel文件中哪些表有数据
    # print(workbook.sheet_names())
    # 可以通过sheet_by_index()方法或sheet_by_name()方法获取到一张表，返回一个对象
    # table = workbook.sheet_by_index(0)
    table = workbook.sheet_by_name(sheet_name)
    # # 通过nrows和ncols获取到表格中数据的行数和列数
    rows = table.nrows
    cols = table.ncols
    # # 可以通过row.values()按行获取数据，返回一个列表，也可以按列
    first_row = True
    headers = []
    for row in range(rows):
        row_data = table.row_values(row)
        if first_row:
            first_row = False
            headers = row_data
            continue
        res_item = {}
        for i in range(0, len(headers)):
            res_item[headers[i]] = row_data[i]
        res_arr.append(res_item)
    return res_arr


def save_excel(file_name, sheet_name, arr_dict):
    if len(arr_dict) < 1:
        return False
    d1 = arr_dict[0]
    titles = []
    for item in d1:
        titles.append(item)
    workbook = xlwt.Workbook(encoding='utf-8')
    worksheet = workbook.add_sheet(sheet_name)
    # 写头部
    for i in range(0, len(titles)):
        worksheet.write(0, i, label=titles[i])

    # 写数据
    row = 1
    for data in arr_dict:
        col_index = 0
        for key in data:
            worksheet.write(row, col_index, label=data[key])
            col_index += 1
        row += 1
    workbook.save(file_name + '.xls')


if __name__ == '__main__':
    # excel = read_excel('./类似关键词.xls', '类似关键词')
    # print(excel)
    a = [{'a': 1, 'b': 2}, {'a': 3, 'b': 4}, {'a': 5, 'b': 6}]
    save_excel('test', 'test12', a)
