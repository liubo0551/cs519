surface
rings( float
		Prob = 0.4,
		Ks = 0.5,
		Kd = 0.5, 
		Ka = .1, 
		roughness = 0.1;
        color	specularcolor = color( 1, 1, 1 )
)
{
	varying vector Nf = faceforward( normalize( N ), I );
	vector V = normalize( -I );
	
	float x = xcomp( P );
	float y = ycomp( P );
	float r = sqrt( x*x + y*y );
	float rfrac = mod( r, 1. );

	if( rfrac < Prob )
		Ci = color( 1., .5, 0. );
	else
		Ci = Cs;

	Oi = 1.;
	Ci = Oi * ( Ci * ( Ka * ambient() + Kd * diffuse(Nf) ) +
		specularcolor * Ks * specular( Nf, V, roughness )  );
}
