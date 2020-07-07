<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ExpertsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('experts')->insert([
            [
                'name'          => 'William Jordan',
                'profession'    => 'Doctor',
                'country'       => 'Anabar',
                'timezone'      => 12,
                'st'            => '2020-07-07 06:00:00',
                'et'            => '2020-07-07 17:00:00'
            ],
            [
                'name'          => 'Quasi Shawa',
                'profession'    => 'Civil engineer',
                'country'       => 'Syria',
                'timezone'      => 3,
                'st'            => '2020-07-07 06:00:00',
                'et'            => '2020-07-07 12:00:00'
            ],
            [
                'name'          => 'Shimaa Badawy',
                'profession'    => 'Computer Engineer',
                'country'       => 'Egypt',
                'timezone'      => 2,
                'st'            => '2020-07-07 13:00:00',
                'et'            => '2020-07-07 14:00:00'
            ]

        ]);
    }
}
