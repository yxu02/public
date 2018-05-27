//
//  Category.swift
//  ToDOOOO
//
//  Created by yu xu on 5/26/18.
//  Copyright © 2018 yu xu. All rights reserved.
//

import Foundation
import RealmSwift

class Category: Object{
    @objc dynamic var name = ""
    @objc dynamic var bkgdColor = ""
    var items = List<Item>()
}
